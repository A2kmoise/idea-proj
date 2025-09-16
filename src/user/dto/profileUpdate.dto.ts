import { IsEmail, IsString } from "class-validator";

export class profileUpdateDto {
@IsString()
@IsEmail()
email:string;

@IsString()
name: string;

@IsString()
username: string;
}