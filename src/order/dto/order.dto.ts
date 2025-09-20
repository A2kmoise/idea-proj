import { IsString, IsInt } from 'class-validator';

export class orderDto {
    @IsString()
    name: string;

    @IsInt()
    userId: number

    @IsInt()
    productId: number;
}