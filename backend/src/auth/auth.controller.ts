import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { SendCodeDto } from "./dto/send-code.dto";
import { VerifyCodeDto } from "./dto/verify-code.dto";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {}

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
        return this.authService.login(loginDto);
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<{ accessToken: string }> {
        return this.authService.register(registerDto);
    }

    @Post('send-code')
    async sendCode(@Body() sendCodeDto: SendCodeDto){
        return this.authService.sendCode(sendCodeDto);
    }

    @Post('verify-code')
    async verifyCode(@Body() verifyCodeDto: VerifyCodeDto): Promise<{ emailToken: string, message: string }>{
        return this.authService.verifyCode(verifyCodeDto);
    }
}