import { IsEmail, IsString, IsStrongPassword, Length, Matches, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsString({ message: "Name must be a string" })
    @Length(2, 40, {
        message: "Name must be between 2 and 40 characters long"
    })
    @Matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s]+$/, {
        message: "Name can only contain letters and spaces"
    })
    name: string;

    
    @IsString({ message: "Email must be a string" })
    @IsEmail({}, { message: "Invalid email format" })
    @MaxLength(255, { message: "Email is too long" })
    email: string;


    @IsString({ message: "Password must be a string" })
    @MaxLength(64, {
        message: "Password must not be more than 64 characters long"
    })
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