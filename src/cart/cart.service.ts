import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto, UpdateCartItemDto, DeleteCartItemDto, DeleteCartDto } from './dto';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) { }

    readCart(userId: number) {
        try {
            return this.prisma.cart.findMany({
                where: { userId },
                include: {
                    product: true,
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    addToCart(data: AddToCartDto) {
        try {
            return this.prisma.cart.create({
                data: {
                    userId: data.userId,
                    productId: data.productId,
                    quantity: data.quantity,
                },
                include: {
                    product: true,
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    updateCart(data: UpdateCartItemDto) {
        try {
            return this.prisma.cart.update({
                where: { id: data.itemId },
                data: {
                    quantity: data.quantity,
                },
                include: {
                    product: true,
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    deleteCartItem(data: DeleteCartItemDto) {
        try {
            return this.prisma.cart.delete({
                where: { id: data.itemId },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    deleteCart(data: DeleteCartDto) {
        try {
            return this.prisma.cart.deleteMany({
                where: { userId: data.userId },
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}
