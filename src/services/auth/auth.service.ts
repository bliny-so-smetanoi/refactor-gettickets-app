import {Injectable, NotAcceptableException, NotFoundException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import {UserRegisterDto} from "../../dtos/user.register.dto";
import {async} from "rxjs";
import {Users} from "../../models/Users";
import {UserLoginDto} from "../../dtos/user.login.dto";
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) {
    }

    async register(userRegisterDto: UserRegisterDto): Promise<void> {
        try {
            const user: Users = await this.usersService.createUser(userRegisterDto)
        } catch (e) {
            throw e
        }
    }

    async login(userLoginDto: UserLoginDto): Promise<object> {
        try {
            const user: any = await this.usersService.getUser(userLoginDto.email)
            if (user === null) {
                throw new NotFoundException('No user exists')
            }
            const passwordValid = await bcrypt.compare(userLoginDto.password, user.password)

            if (!passwordValid) {
                throw new NotFoundException('No user exists')
            }

            return {
                token: this.jwtService.sign({email: user.email, sub: user._id})
            }
        } catch (e) {
            throw e
        }
    }
}
