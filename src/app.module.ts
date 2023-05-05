import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, AccountModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
