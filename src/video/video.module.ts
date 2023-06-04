import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entity/video.entity';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateVideoHandler } from './create-video.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Video]), CqrsModule],
  controllers: [VideoController],
  providers: [VideoService, CreateVideoHandler],
})
export class VideoModule {}
