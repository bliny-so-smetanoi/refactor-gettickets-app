import {HydratedDocument} from "mongoose";
import {Prop, raw, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema({versionKey: false})
export class Details{
    @Prop()
    sector: string
    @Prop()
    price: number

}

export const details = SchemaFactory.createForClass(Details)

export type OrdersDocument = HydratedDocument<Orders>
@Schema({versionKey: false})
export class Orders{
    @Prop()
    owner: string;
    @Prop()
    details: [Details]
    @Prop()
    event: string;
    @Prop()
    event_time: Date;
    @Prop()
    place: string;
    @Prop()
    total_cost: number;
    @Prop()
    date_time: Date;
}

export const OrdersSchema = SchemaFactory.createForClass(Orders)