import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoService {
  async findAll() {
    return 'video list';
  }

  async findOne(id: string) {
    return 'video';
  }

  async download(id: string) {
    return 'play';
  }
}
