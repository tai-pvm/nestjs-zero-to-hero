import {
  Injectable,
  NestInterceptor,
  type CallHandler,
  type ExecutionContext
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  public intercept<T>(context: ExecutionContext, next: CallHandler<T>) {
    return next.handle().pipe(map(data => instanceToPlain(data)));
  }
}
