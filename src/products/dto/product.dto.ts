import { IsNotEmpty, MaxLength, IsString,IsNumber  } from "class-validator";

export class ProductDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price:number;

    @IsString()
    @MaxLength(150)
    description:string;
}