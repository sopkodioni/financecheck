import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { NewUser } from "./interfaces/new-user.interface";
import bcrypt from 'bcryptjs';
import { User } from "src/prisma/generated/client";

@Injectable()
export class AuthService{
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ){}

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

    
    async regirster(dto: RegisterDto): Promise<{ accessToken: string }>{
        const existsUser = await this.usersService.findByEmail(dto.email);

        if(!existsUser){
            const passHash = await bcrypt.hash(dto.password, 10);

            const newUser: NewUser = {
                name: dto.name,
                email: dto.email,
                passHash
            }

            const user: User = await this.usersService.create(newUser);

            return this.generateToken(user);
        } else {
            throw new ConflictException('User with this email alrady exists');
        }
    }

    private async generateToken(user: User): Promise<{ accessToken: string }>{
        const payload: JwtPayload = { sub: user.id, name: user.name }
        return { accessToken: await this.jwtService.signAsync(payload) }
    }
}