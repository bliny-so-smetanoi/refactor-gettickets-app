import {Body, Controller, HttpStatus, Post, Req, Res, UseGuards} from '@nestjs/common';
import {OrdersService} from "../../services/orders/orders.service";
import {CreateOrderDto} from "../../dtos/create.order.dto";
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/services/auth/local.auth';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService,
                private readonly jwtService: JwtService) {}

    @UseGuards(AuthGuard)
    @Post('/create')
    async createOrder(@Res() res, @Req() req: Request, @Body() createOrderDto: CreateOrderDto): Promise<void> {
        try {
            
            const userId = this.jwtService.decode(req.headers['authorization'].split(' ')[1]).sub;
            createOrderDto.newOrder.owner = userId;
            await this.ordersService.tryCreateOrder(createOrderDto)
            res.status(HttpStatus.OK).json({message: 'Purchase proceeded'})
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).json({message: e.message})
        }
    }
}
