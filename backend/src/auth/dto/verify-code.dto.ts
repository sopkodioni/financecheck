import { IsEmail, IsString, Length, MaxLength } from "class-validator";

export class VerifyCodeDto{
    @IsString({ message: "Email must be a string" })
    @IsEmail({}, { message: "Invalid email format" })
    @MaxLength(255, { message: "Email is too long" })
    email: string;

    @IsString()
    @Length(4, 4, { message: "Code must have 8 characters" })
    code: string;
}