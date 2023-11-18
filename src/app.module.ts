import { Module } from '@nestjs/common';
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import configuration from "../config/configuration";
import {AuthController} from "./controllers/auth/auth.controller";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {AuthService} from "./services/auth/auth.service";
import {UsersSchema} from "./models/Users";
import {UsersService} from "./services/users/users.service";
import {AuthGuard} from "./services/auth/local.auth";
import {EventsController} from "./controllers/events/events.controller";
import {EventsService} from "./services/events/events.service";
import {OrdersService} from "./services/orders/orders.service";
import {Seats, SeatsSchema} from "./models/Seats";
import {OrdersSchema} from "./models/Orders";
import {EventsSchema} from "./models/Events";
import {OrdersController} from "./controllers/orders/orders.controller";
import {UserController} from "./controllers/user/user.controller";

@Module({
    imports: [PassportModule,
        JwtModule.register({secret: 'keyyy',
            signOptions: {expiresIn: '1h'}}),
        ConfigModule.forRoot({load: [configuration]}),
        MongooseModule.forRoot('mongodb://127.0.0.1/project'),
        MongooseModule.forFeature([{name: 'users', schema: UsersSchema},
            {name: 'seats', schema: SeatsSchema},
            {name: 'orders', schema: OrdersSchema},
            {name: 'events', schema: EventsSchema}])],
    providers: [AppService, UsersService, AuthService, AuthGuard, EventsService, OrdersService],
    controllers: [AppController, AuthController, EventsController, OrdersController, UserController]
})
export class AppModule {}
