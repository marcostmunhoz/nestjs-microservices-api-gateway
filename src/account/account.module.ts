import { Global, Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ACCOUNT_PACKAGE_NAME, ACCOUNT_SERVICE_NAME } from './account.pb';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: ACCOUNT_SERVICE_NAME,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          const url = configService.get<string>('ACCOUNT_SERVICE_HOST');
          const port = configService.get<number>('ACCOUNT_SERVICE_PORT');

          return {
            transport: Transport.GRPC,
            options: {
              package: ACCOUNT_PACKAGE_NAME,
              url: `${url}:${port}`,
              protoPath: join(
                'node_modules',
                'nestjs-microservices-proto',
                'proto',
                'account.proto',
              ),
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
