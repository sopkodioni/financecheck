import { IsEmail, IsString, MaxLength } from "class-validator";

export class SendCodeDto{
    @IsString({ message: "Email must be a string" })
    @IsEmail({}, { message: "Invalid email format" })
    @MaxLength(255, { message: "Email is too long" })
    email: string;
}