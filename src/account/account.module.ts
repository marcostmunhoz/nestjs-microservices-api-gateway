import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ACCOUNT_PACKAGE_NAME, ACCOUNT_SERVICE_NAME } from './account.pb';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ACCOUNT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: ACCOUNT_PACKAGE_NAME,
          url: '0.0.0.0:50052',
          protoPath: join(
            'node_modules',
            'nestjs-microservices-proto',
            'proto',
            'account.proto',
          ),
        },
      },
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [],
})
export class AccountModule {}
