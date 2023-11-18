import {Body, Controller, HttpStatus, Post, Req, Res} from '@nestjs/common';
import {OrdersService} from "../../services/orders/orders.service";
import {CreateOrderDto} from "../../dtos/create.order.dto";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }

    @Post('/create')
    async createOrder(@Res() res, @Req() req, @Body() createOrderDto: CreateOrderDto): Promise<void> {
        try {
            await this.ordersService.tryCreateOrder(createOrderDto)

            res.status(HttpStatus.OK).json({message: 'Purchase proceeded'})
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).json({message: e.message})
        }
    }
}
