import { IEvent } from '@nestjs/cqrs';

export class VideoCreatedEvent implements IEvent {
  constructor(readonly id: string) {}
}
