import {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type EventsDocument = HydratedDocument<Events>

@Schema({versionKey: false})
export class Events{
    @Prop()
    name: string;
    @Prop()
    artist: string;
    @Prop()
    image: string;
    @Prop()
    date_time: Date;
    @Prop()
    address: string;
    @Prop()
    description: string;
}

export const EventsSchema = SchemaFactory.createForClass(Events)