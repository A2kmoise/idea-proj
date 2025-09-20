import { IsInt, IsOptional, IsNumber } from 'class-validator';

export class AddToCartDto {
  @IsInt()
  userId: number;

  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;
}

export class UpdateCartItemDto {
  @IsInt()
  itemId: number;

  @IsInt()
  @IsOptional()
  quantity?: number;
}

export class DeleteCartItemDto {
  @IsInt()
  itemId: number;
}

export class DeleteCartDto {
  @IsInt()
  userId: number;
}
