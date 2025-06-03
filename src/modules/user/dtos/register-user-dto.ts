import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class RegisterUserDto{

    @IsEmail()
    email: string;

    @IsString()
    @Length(6)
    password: string;

    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsString()
    @IsOptional()
    title?: string;

}