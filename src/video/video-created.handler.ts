import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { VideoCreatedEvent } from './event/video-created.event';

@EventsHandler(VideoCreatedEvent)
export class VideoCreatedHandler implements IEventHandler<VideoCreatedEvent> {
  handle(event: VideoCreatedEvent) {
    console.info(`Video created(id: ${event.id})`);
  }
}
