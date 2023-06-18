import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T, R> implements NestInterceptor<T, R> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<R> {
    return next.handle().pipe(
      map((data) => {
        const http = context.switchToHttp();
        const request = http.getRequest<ExpressRequest>();

        if (Array.isArray(data)) {
          return {
            items: data,
            page: Number(request.query['page'] || 1),
            size: Number(request.query['size'] || 20),
          };
        } else {
          return data;
        }
      }),
    );
  }
}
