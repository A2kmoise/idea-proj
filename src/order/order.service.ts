import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { orderDto } from './dto';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) { }

    readAllOrders() {
        try {
            return this.prisma.order.findMany();
        } catch (error) {
            throw new Error(error);
        }
    }

    createOrder(data: orderDto) {
        try {
            return this.prisma.order.create({
                data: data,
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    updateOrder(id: number, data: Partial<orderDto>) {
        try {
            return this.prisma.order.update({
                where: { id },
                data: data,
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    cancelOrder(id: number) {
        try {
            return this.prisma.order.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}
