import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private readonly service: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> | never {
    const request = context.switchToHttp().getRequest();
    const token = this.resolveToken(request);

    request.accountId = await this.validateToken(token);

    return true;
  }

  private resolveToken(request: { headers: { authorization: string } }) {
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const [, token] = authorization.split(' ');

    if (!token) {
      throw new UnauthorizedException();
    }

    return token;
  }

  private async validateToken(token: string): Promise<string> {
    const response = await this.service.validate(token);

    if (response.status !== HttpStatus.OK) {
      throw new UnauthorizedException();
    }

    return response.accountId;
  }
}
