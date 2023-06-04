import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entity/video.entity';
import { Repository } from 'typeorm';
import { join } from 'node:path';
import { stat } from 'fs/promises';
import { createReadStream, ReadStream } from 'node:fs';

@Injectable()
export class VideoService {
  constructor(@InjectRepository(Video) private readonly videoRepository: Repository<Video>) {}

  async findOne(id: string) {
    const video = await this.videoRepository.findOne({ relations: ['user'], where: { id } });
    if (!video) throw new NotFoundException('No video');
    return video;
  }

  async download(id: string): Promise<{ stream: ReadStream; mimetype: string; size: number }> {
    const video = await this.videoRepository.findOneBy({ id });
    if (!video) throw new NotFoundException('No video');

    await this.videoRepository.update({ id }, { downloadCnt: () => 'download_cnt + 1' });

    const { mimetype } = video;
    const extension = mimetype.split('/')[1];
    const videoPath = join(process.cwd(), 'video-storage', `${id}.${extension}`);
    const { size } = await stat(videoPath);
    const stream = createReadStream(videoPath);
    return { stream, mimetype, size };
  }
}
