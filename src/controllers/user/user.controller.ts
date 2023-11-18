import {Body, Controller, Get, HttpStatus, Param, Req, Res, UseGuards} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";
import {UserInfoDto} from "../../dtos/user.info.dto";
import {AuthGuard} from "../../services/auth/local.auth";


@Controller('user')
export class UserController {
    constructor(private readonly usersService: UsersService) {
    }

    @UseGuards(AuthGuard)
    @Get('/')
    async getUserInfo(@Res() res, @Req() req, @Body() userInfoDto: UserInfoDto): Promise<void> {
        try {
            const user = await this.usersService.getInfoWithOrders(userInfoDto.id)
            res.status(HttpStatus.OK).json(user)

        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).json({message: e.message})
        }
    }

}
