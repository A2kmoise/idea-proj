import { Body, Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { orderDto } from './dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/')
  readAllOrders() {
    return this.orderService.readAllOrders();
  }

  @Post('create')
  createOrder(@Body() body: orderDto) {
    return this.orderService.createOrder(body);
  }

  @Patch('update')
  updateOrder(@Body() body: { id: number } & Partial<orderDto>) {
    const { id, ...data } = body;
    return this.orderService.updateOrder(id, data);
  }

  @Delete('del')
  cancelOrder(@Body() body: { id: number }) {
    return this.orderService.cancelOrder(body.id);
  }
}
