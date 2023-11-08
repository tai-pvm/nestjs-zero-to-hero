import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import type { Request } from 'express';

export const GetUser = createParamDecorator(
  <T>(data: T, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    return req.user;
  }
);
