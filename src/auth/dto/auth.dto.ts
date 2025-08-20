import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";


export class Authdto{
    @IsEmail()
    @IsNotEmpty()
    email: String;


    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password:string;

    @IsString()
    @IsNotEmpty()
    name: String;

    @IsString()
    @IsNotEmpty()
    username: String;

}

