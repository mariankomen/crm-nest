import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';

@Module({
    imports: [CoreModule, UserModule],
    exports: [CoreModule, UserModule]
})
export class CoreModule {}
