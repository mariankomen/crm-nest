import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dtos/register-user-dto';
import type { User } from '@prisma/client';
import { UserDto } from './dtos/user-dto';

@Controller('users')
export class UserController {
    constructor(private readonly service: UserService){}

    @Post('/create')
    async createUser(@Body() dto: RegisterUserDto): Promise<UserDto>{
        return await this.service.createUser(dto);
    }
}
