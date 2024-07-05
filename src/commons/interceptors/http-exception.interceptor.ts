import {
  CallHandler,
  Catch,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError } from 'rxjs';

@Injectable()
@Catch(HttpException)
export class HttpExceptionInterceptor implements NestInterceptor {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(HttpExceptionInterceptor.name);
  }

  intercept(_context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((err: HttpException) => {
        if (err.cause) {
          this.logger.error(err.cause);
        }

        throw err;
      }),
    );
  }
}