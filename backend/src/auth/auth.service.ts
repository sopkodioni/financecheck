import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { NewUser } from "./interfaces/new-user.interface";
import bcrypt from 'bcryptjs';
import { User } from "src/prisma/generated/client";
import { SendCodeDto } from "./dto/send-code.dto";
import * as nodemailer from 'nodemailer';
import { ConfigService } from "@nestjs/config";
import { RedisSerivce } from "src/redis/redis.service";
import { VerifyCodeDto } from "./dto/verify-code.dto";
import { DecodedToken } from "./interfaces/decoded-token.interface";

function getEmailTemaplteHtml(code: string): string{
    return `
        <div style="border: 1px solid black; padding: 10px; display: flex; align-items: center; justify-content: center;">
            <h1 style="font-size: 50px; font-family: Arial; letter-spacing: 1.3px;">
                ${ code }
            </h1>
        </div> 
    `
}

@Injectable()
export class AuthService{
    private readonly mailTransporter: nodemailer.Transporter;

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private redisService: RedisSerivce
    ){
        this.mailTransporter = nodemailer.createTransport({
            host: this.configService.getOrThrow<string>('MAILTRAP_HOST'),
            port: this.configService.getOrThrow<number>('MAILTRAP_PORT'),
            auth: {
                user: this.configService.getOrThrow<string>('MAILTRAP_USER'),
                pass: this.configService.getOrThrow<string>('MAILTRAP_PASS')
            }
        });
    }

    async login(dto: LoginDto): Promise<{ accessToken: string }>{
        const user: User | null = await this.usersService.findByEmail(dto.email);

        if(!user){
            throw new UnauthorizedException('Incorrect email or password');
        } 

        const isPasswordValid = await bcrypt.compare(dto.password, user.passHash);

        if(!isPasswordValid){
            throw new UnauthorizedException('Incorrect email or password');
        }

        return this.generateToken(user);
    }

    
    async register(dto: RegisterDto): Promise<{ accessToken: string }>{
        let decodedEmailToken: DecodedToken

        try{
            decodedEmailToken = await this.jwtService.verifyAsync(dto.emailToken);
        } catch(error) {
            throw new BadRequestException('Invalid or expired email verification token')
        }

        const verifiedEmail = decodedEmailToken.email;
        const existsUser = await this.usersService.findByEmail(verifiedEmail);

        if(!existsUser){
            const passHash = await bcrypt.hash(dto.password, 10);

            const newUser: NewUser = {
                name: dto.name,
                email: verifiedEmail,
                passHash
            }

            const user: User = await this.usersService.create(newUser);
            return this.generateToken(user);
        } else {
            throw new ConflictException('User with this email alrady exists');
        }
    }

    async sendCode(dto: SendCodeDto){
        const code = Math.floor(1000 + Math.random() * 9000).toString();

        await this.mailTransporter.sendMail({
            from: "Financecheck <hello@financecheck.com>",
            to: dto.email,
            subject: "Authentification code",
            html: getEmailTemaplteHtml(code)
        });

        await this.redisService.set(`auth:code:${dto.email}`, code, "EX", 300);

        return {
            success: true,
            message: "Code successfully delivered"
        }
    }

    async verifyCode(dto: VerifyCodeDto): Promise<{ emailToken: string, message: string }>{
        const code = await this.redisService.get(`auth:code:${dto.email}`);

        if(!code){
            throw new BadRequestException("Verification code has expired or does not exist");
        }

        if(code !== dto.enteredCode){
            throw new BadRequestException("Incorrect verification code");
        }

        await this.redisService.del(`auth:code:${dto.email}`);

        const emailPayload = {
            email: dto.email,
            isEmailVerified: true
        }

        const emailToken = await this.jwtService.signAsync(emailPayload, { expiresIn: '10m' });

        return {
            emailToken,
            message: 'Email verified successfully'
        }
    }

    private async generateToken(user: User): Promise<{ accessToken: string }>{
        const payload: JwtPayload = { sub: user.id, name: user.name }
        return { accessToken: await this.jwtService.signAsync(payload) }
    }
}