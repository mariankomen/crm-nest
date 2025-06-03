import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [CoreModule, CoreModule, AuthModule]
})
export class AppModule { }
