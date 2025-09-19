import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './dto';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    getProducts(name: string) {
        try {
            return this.prisma.Products.findMany({
                where: {
                    name: name,
                }
            });

        } catch (error) {
            throw new Error(error);
        }
    }

    createProduct(data: ProductDto) {
        try {
            return this.prisma.Products.create({
                data: data,
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    updateProduct(id: number, data: Partial<ProductDto>) {
        try {
            return this.prisma.Products.update({
                where: { id },
                data: data,
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    deleteProduct(id: number) {
        try {
            return this.prisma.Products.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

