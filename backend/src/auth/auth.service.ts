import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { NewUser } from "./interfaces/new-user.interface";
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService{
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ){}

    async login(dto: LoginDto): Promise<{ accesToken: string }>{
        const user = await this.usersService.findByEmail(dto.email);

        if(!user){
            throw new UnauthorizedException('Incorrect email or password');
        } 

        const isPasswordValid = await bcrypt.compare(dto.password, user.passHash);

        if(!isPasswordValid){
            throw new UnauthorizedException('Incorrect email or password');
        }

        const payload: JwtPayload = { sub: user.id, name: user.name }
        return { accesToken: await this.jwtService.signAsync(payload) }
    }

    
    async regirster(dto: RegisterDto): Promise<{ accesToken: string }>{
        const existsUser = await this.usersService.findByEmail(dto.email);

        if(!existsUser){
            const passHash = await bcrypt.hash(dto.password, 10);

            const newUser: NewUser = {
                name: dto.name,
                email: dto.email,
                passHash
            }

            const user = await this.usersService.create(newUser);

            const payload: JwtPayload = { sub: user.id, name: user.name }
            return { accesToken: await this.jwtService.signAsync(payload) }
        } else {
            throw new ConflictException('User with this email alrady exists');
        }
    }
}