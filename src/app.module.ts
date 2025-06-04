import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [
		ConfigModule.forRoot(),
		CoreModule, 
		AuthModule, 
	]
})
export class AppModule { }
