import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";

export class LoginDto{
    @IsString({ message: "Email must be a string" })
    @IsEmail({}, { message: "Invalid email format" })
    @MaxLength(255, { message: "Email is too long" })
    email: string;

    @IsString({ message: "Password must be a string" })
    @MaxLength(64, {
        message: "Password must not be more than 64 characters long"
    })
    @IsNotEmpty()
    password: string;
}