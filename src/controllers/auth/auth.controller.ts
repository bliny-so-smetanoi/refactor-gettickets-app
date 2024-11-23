import {Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards} from '@nestjs/common';
import {AuthService} from "../../services/auth/auth.service";
import {UserLoginDto} from "../../dtos/user.login.dto";
import {UserRegisterDto} from "../../dtos/user.register.dto";
import {UsersService} from "../../services/users/users.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {
    }
    @Post('/register')
    async register(@Req() req, @Res() res, @Body() userRegisterDto: UserRegisterDto): Promise<void>{
        try {
            await this.authService.register(userRegisterDto)

            res.status(HttpStatus.OK).json({message: 'User successfully registered'});
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).json({message: e.message})
        }
    }
    @Post('/login')
    async login(@Req() req, @Res() res, @Body() userLoginDto: UserLoginDto): Promise<void>{
        try {
            const authToken = await this.authService.login(userLoginDto)

            res.status(HttpStatus.OK).json(authToken)
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).json({message: e.message})
        }
    }
}
