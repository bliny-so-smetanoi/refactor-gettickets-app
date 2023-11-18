import {Injectable, NotAcceptableException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Users, UsersDocument} from "../../models/Users";
import {Model} from "mongoose";
import {UserRegisterDto} from "../../dtos/user.register.dto";
import * as bcrypt from 'bcrypt'
import * as readline from "readline";
import {OrdersDocument} from "../../models/Orders";
@Injectable()
export class UsersService {
    constructor(@InjectModel('users') private readonly userModel: Model<UsersDocument>,
                @InjectModel('orders') private readonly ordersModel: Model<OrdersDocument>) {
    }

    async createUser(userRegisterDto: UserRegisterDto): Promise<Users> {
        try {
            if (await this.isEmailExists(userRegisterDto.email)) {
                throw new NotAcceptableException('User already exists')
            } else {
                return this.userModel.create({
                    email: userRegisterDto.email,
                    name: userRegisterDto.name,
                    password: await bcrypt.hash(userRegisterDto.password, 10),
                    phone: userRegisterDto.phone
                })
            }
        } catch (e) {
            throw e
        }
    }

    private async isEmailExists(email: string): Promise<boolean> {
        try {
            const user: Users = await this.userModel.findOne({email})
            return user !== null ? true : false
        } catch (e) {
            throw e
        }
    }

    async getUser(email: string): Promise<Users> {
        try {
            return this.userModel.findOne({email})
        } catch (e) {
            throw e
        }
    }

    async getInfoWithOrders(id: string): Promise<any> {
        try {
            const user = await this.userModel.findById(id)
            const orders = await this.ordersModel.find({owner: id})

            return {user, orders}
        } catch (e) {
            throw e
        }
    }
}

