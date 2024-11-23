import {Body, Controller, Get, HttpStatus, Param, Req, Res, UseGuards} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";
import {UserInfoDto} from "../../dtos/user.info.dto";
import {AuthGuard} from "../../services/auth/local.auth";
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';


@Controller('user')
export class UserController {
    constructor(private readonly usersService: UsersService,
                private readonly jwtService: JwtService) {}

    @UseGuards(AuthGuard)
    @Get('/')
    async getUserInfo(@Res() res, @Req() req: Request, @Body() userInfoDto: UserInfoDto): Promise<void> {
        try {
            const userId = this.jwtService.decode(req.headers['authorization'].split(' ')[1]).sub;
            const user = await this.usersService.getInfoWithOrders(userId)
            res.status(HttpStatus.OK).json(user)

        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).json({message: e.message})
        }
    }

}
