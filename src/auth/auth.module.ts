import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from './auth.pb';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE_NAME,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          const url = configService.get<string>('AUTH_SERVICE_HOST');
          const port = configService.get<number>('AUTH_SERVICE_PORT');

          return {
            transport: Transport.GRPC,
            options: {
              package: AUTH_PACKAGE_NAME,
              url: `${url}:${port}`,
              protoPath: join(
                'node_modules',
                'nestjs-microservices-proto',
                'proto',
                'auth.proto',
              ),
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
