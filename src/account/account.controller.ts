import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  GetAccountResponse,
  RegisterRequest,
  RegisterResponse,
  UpdateAccountRequest,
  UpdateAccountResponse,
} from './account.pb';
import { AuthGuard } from 'src/auth';
import { AccountService } from './account.service';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @UseGuards(AuthGuard)
  async show(@Req() request: any): Promise<GetAccountResponse> {
    return await this.accountService.getAccount(request.id);
  }

  @Post()
  async store(@Body() data: RegisterRequest): Promise<RegisterResponse> {
    return await this.accountService.register(data);
  }

  @Put()
  @UseGuards(AuthGuard)
  async update(
    @Req() request: any,
    @Body() data: Omit<UpdateAccountRequest, 'id'>,
  ): Promise<UpdateAccountResponse> {
    return await this.accountService.updateAccount({ ...data, id: request.id });
  }
}
