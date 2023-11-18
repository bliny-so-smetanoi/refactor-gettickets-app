import mongoose, {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Events} from "./Events";

export type SeatsDocument = HydratedDocument<Seats>

@Schema({versionKey: false})
export class Seats{
    @Prop()
    sector: string;
    @Prop()
    price: number;
    @Prop()
    quantity: number;
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Events'}]})
    owner: string
}

export const SeatsSchema = SchemaFactory.createForClass(Seats)