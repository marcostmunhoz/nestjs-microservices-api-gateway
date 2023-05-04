/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "account";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  status: number;
  error: string[];
  id: string;
}

export interface GetAccountRequest {
  id: string;
}

export interface Account {
  name: string;
  email: string;
}

export interface GetAccountResponse {
  status: number;
  error: string[];
  account: Account | undefined;
}

export interface UpdateAccountRequest {
  id: string;
  name: string;
  email: string;
}

export interface UpdateAccountResponse {
  status: number;
  error: string[];
}

export const ACCOUNT_PACKAGE_NAME = "account";

export interface AccountServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;

  getAccount(request: GetAccountRequest): Observable<GetAccountResponse>;

  updateAccount(request: UpdateAccountRequest): Observable<UpdateAccountResponse>;
}

export interface AccountServiceController {
  register(request: RegisterRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  getAccount(
    request: GetAccountRequest,
  ): Promise<GetAccountResponse> | Observable<GetAccountResponse> | GetAccountResponse;

  updateAccount(
    request: UpdateAccountRequest,
  ): Promise<UpdateAccountResponse> | Observable<UpdateAccountResponse> | UpdateAccountResponse;
}

export function AccountServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["register", "getAccount", "updateAccount"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AccountService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AccountService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ACCOUNT_SERVICE_NAME = "AccountService";
