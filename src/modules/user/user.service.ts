import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import type { User } from '@prisma/client';
import { RegisterUserDto } from './dtos/register-user-dto';
import { hash } from 'argon2';
import { UserDto } from './dtos/user-dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async createUser(dto: RegisterUserDto): Promise<UserDto>{
        dto.password = await hash(dto.password);
        const user = await this.prisma.user.create({
            data: dto
        });

        const {password, ...userRecord} = user;
        
        return userRecord as UserDto;
    }
}
