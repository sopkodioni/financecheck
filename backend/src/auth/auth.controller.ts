import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { SendCodeDto } from "./dto/send-code.dto";
import { Send } from "express";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
        return this.authService.login(loginDto);
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<{ accessToken: string }> {
        return this.authService.regirster(registerDto);
    }

    @Post('send-code')
    async sendCode(@Body() sendCodeDto: SendCodeDto){
        this.authService.sendCode(sendCodeDto);
    }
}