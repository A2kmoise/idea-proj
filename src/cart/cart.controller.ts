import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto, DeleteCartItemDto, DeleteCartDto } from './dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get(':userId')
  readCart(@Param('userId') userId: string) {
    return this.cartService.readCart(parseInt(userId));
  }

  @Post()
  addToCart(@Body() body: AddToCartDto) {
    return this.cartService.addToCart(body);
  }

  @Patch('item')
  updateCart(@Body() body: UpdateCartItemDto) {
    return this.cartService.updateCart(body);
  }

  @Delete('item')
  deleteCartItem(@Body() body: DeleteCartItemDto) {
    return this.cartService.deleteCartItem(body);
  }

  @Delete()
  deleteCart(@Body() body: DeleteCartDto) {
    return this.cartService.deleteCart(body);
  }
}
