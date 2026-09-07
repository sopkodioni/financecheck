import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length, Matches, MaxLength, minLength } from "class-validator";

export class RegisterDto{
    @IsString({ message: "Name must be a string" })
    @Length(2, 40, {
        message: "Name must be between 2 and 40 characters long"
    })
    @Matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s]+$/, {
        message: "Name can only contain letters and spaces"
    })
    name: string;

    @IsString({ message: "The token is invalid, or access is denied" })
    @IsNotEmpty({ message: "Email verification is required to continue registration" })
    emailToken: string;

    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
    },
    {
        message: "Password must contain at least 8 characters, including uppercase, lowercase and numbers"
    })
    password: string;
}