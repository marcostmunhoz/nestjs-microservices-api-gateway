import { Inject, Injectable } from '@nestjs/common';
import { ACCOUNT_SERVICE_NAME, AccountServiceClient } from './account.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AccountService {
  private svc: AccountServiceClient;

  constructor(
    @Inject(ACCOUNT_SERVICE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.svc =
      this.client.getService<AccountServiceClient>(ACCOUNT_SERVICE_NAME);
  }

  async getAccount(id: string) {
    return firstValueFrom(this.svc.getAccount({ id }));
  }

  async register(data: any) {
    return firstValueFrom(this.svc.register(data));
  }

  async updateAccount(data: any) {
    return firstValueFrom(this.svc.updateAccount(data));
  }
}
