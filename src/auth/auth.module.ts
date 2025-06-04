import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/modules/user/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from 'src/config/jwt.config';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
		UserModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	],
  controllers: [AuthController],
  providers: [
    AuthService, 
    UserService,
    ConfigService,
	PrismaService
  ]
})
export class AuthModule {}
