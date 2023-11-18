import {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type UsersDocument = HydratedDocument<Users>

@Schema({versionKey: false})
export class Users {
    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    name: string;

    @Prop()
    phone: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users)