import { ICommand } from '@nestjs/cqrs';

export class CreateVideoCommand implements ICommand {
  constructor(
    readonly userId: string,
    readonly title: string,
    readonly mimetype: string,
    readonly extension: string,
    readonly buffer: Buffer,
  ) {}
}
