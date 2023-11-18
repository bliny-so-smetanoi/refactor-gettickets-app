import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {OrdersDocument} from "../../models/Orders";
import {Model} from "mongoose";
import {CreateOrderDto} from "../../dtos/create.order.dto";
import {SeatsDocument} from "../../models/Seats";

@Injectable()
export class OrdersService {
    constructor(@InjectModel('orders') private readonly ordersModel: Model<OrdersDocument>,
                @InjectModel('seats') private readonly seatsModel: Model<SeatsDocument>) {
    }

    async tryCreateOrder(createOrderDto: CreateOrderDto): Promise<void> {
        try {
            await this.createOrder(createOrderDto)
        } catch (e) {
            throw e
        }
    }

    private async createOrder(createOrderDto: CreateOrderDto): Promise<void> {
        const res = await this.seatsModel.deleteMany({owner: createOrderDto.seats[0].owner[0]})
        await this.seatsModel.insertMany(createOrderDto.seats)

        const createdOrder = new this.ordersModel(createOrderDto.newOrder)
        await createdOrder.save()
    }
}
