import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailModule } from 'src/email/email.module';
import { VideoModule } from 'src/video/video.module';

@Module({
  imports: [ScheduleModule.forRoot(), EmailModule, VideoModule],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
