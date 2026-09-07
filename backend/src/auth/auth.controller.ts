import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { SendCodeDto } from "./dto/send-code.dto";
import { VerifyCodeDto } from "./dto/verify-code.dto";
import { VerifyCode } from "./interfaces/verify-code.interface";
import { AuthResponse } from "./interfaces/auth-response.interface";
import { SendCode } from "./interfaces/send-code.interface";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {}

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
        return this.authService.login(loginDto);
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
        return this.authService.register(registerDto);
    }

    @Post('send-code')
    async sendCode(@Body() sendCodeDto: SendCodeDto): Promise<SendCode>{
        return this.authService.sendCode(sendCodeDto);
    }

    @Post('verify-code')
    async verifyCode(@Body() verifyCodeDto: VerifyCodeDto): Promise<VerifyCode>{
        return this.authService.verifyCode(verifyCodeDto);
    }
}