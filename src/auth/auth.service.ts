import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from 'src/modules/user/dtos/register-user-dto';
import { UserService } from 'src/modules/user/user.service';
import { Response } from 'express'
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dtos/auth-dto';

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private readonly userService: UserService,
        private configService: ConfigService,
    ){}

    EXPIRE_DAY_REFRESH_TOKEN = 1
    REFRESH_TOKEN_NAME = 'refreshToken'

    async register(registerDto: RegisterUserDto){
        const user = await this.userService.createUser(registerDto);
        if(!user) throw new NotFoundException('User not found');
        const {password, ...userRecord} = user;

        const tokens = this.issueTokens(user.id);

        return {
            userRecord,
            ...tokens
        }
    }

    async login(dto: AuthDto) {
		const user = await this.validateUser(dto)

		const tokens = this.issueTokens(user.id)

		return { user, ...tokens }
	}

    async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Invalid Refresh Token.')

		const user = await this.userService.getUserById(result.id)
        
        if(!user) throw new NotFoundException('User not found');

		const tokens = this.issueTokens(user.id)

		return { user, ...tokens }
	}

    issueTokens(userId: string) {
        const data = {id: userId};

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}

    private async validateUser(dto: AuthDto) {
		const user = await this.userService.getUserByEmail(dto.email)

		if (!user) throw new NotFoundException('User not found.')

		return user;
	}

    addRefreshTokenToResponse(res: Response, refreshToken: string) {
        const expiresIn = new Date()
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)
        res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            domain: this.configService.get('SERVER_DOMAIN'),
            expires: expiresIn,
            secure: true,
            sameSite: 'none'
        })
    }

    removeRefreshTokenFromResponse(res: Response) {
        res.cookie(this.REFRESH_TOKEN_NAME, '', {
            httpOnly: true,
            domain: this.configService.get('SERVER_DOMAIN'),
            expires: new Date(0),
            secure: true,
            sameSite: 'none'
        })
    }
}
