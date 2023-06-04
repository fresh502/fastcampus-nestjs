import { IQuery } from '@nestjs/cqrs';

export class FindVideosQuery implements IQuery {
  constructor(readonly page: number, readonly size: number) {}
}
