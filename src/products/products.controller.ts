import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Get('read')
    getProducts(@Query('name') name: string) {
        return this.productsService.getProducts(name);
    }

    @Post('create')
    createProduct(@Body() data: ProductDto) {
        return this.productsService.createProduct(data);
    }

    @Patch('update')
    updateProduct(@Body() body: { id: number } & Partial<ProductDto>) {
        const { id, ...data } = body;
        return this.productsService.updateProduct(id, data);
    }

    @Delete('delete')
    deleteProduct(@Body() body: { id: number }) {
        return this.productsService.deleteProduct(body.id);
    }
}