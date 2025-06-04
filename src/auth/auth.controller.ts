import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterUserDto } from 'src/modules/user/dtos/register-user-dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express'
import { AuthDto } from './dtos/auth-dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    

    @Post('register')
    async register(
        @Body() dto: RegisterUserDto, 
        @Res({ passthrough: true }) res: Response
    ){
        const { refreshToken, ...response } = await this.authService.register(dto)
		this.authService.addRefreshTokenToResponse(res, refreshToken)

        return response;
    }

    @Post('login')
    async login(
        @Body() dto: AuthDto,
        @Res({ passthrough: true }) res: Response
    ){
        const { refreshToken, ...response } = await this.authService.login(dto)

		this.authService.addRefreshTokenToResponse(res, refreshToken)

		return response;
    }
}
