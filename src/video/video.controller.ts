import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Query,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { VideoService } from './video.service';
import { CreateVideoReqDto, FindVideoReqDto } from './dto/req.dto';
import { PageReqDto } from 'src/common/dto/req.dto';
import { ApiGetItemsResponse, ApiGetResponse, ApiPostResponse } from 'src/common/decorator/swagger.decorator';
import { CreateVideoResDto, FindVideoResDto } from './dto/res.dto';
import { PageResDto } from 'src/common/dto/res.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { ThrottlerBehindProxyGuard } from 'src/common/guard/throttler-behind-proxy.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateVideoCommand } from './command/create-video.command';
import { User, UserAfterAuth } from 'src/common/decorator/user.decorator';
import { FindVideosQuery } from './query/find-videos.query';
import { title } from 'process';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Public } from 'src/common/decorator/public.decorator';

@ApiTags('Video')
@ApiExtraModels(FindVideoReqDto, PageReqDto, CreateVideoResDto, FindVideoResDto, PageResDto)
@UseGuards(ThrottlerBehindProxyGuard)
@Controller('api/videos')
export class VideoController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus, private videoService: VideoService) {}

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiPostResponse(CreateVideoResDto)
  @UseInterceptors(FileInterceptor('video'))
  @Post()
  async upload(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'mp4',
        })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Body() createVideoReqDto: CreateVideoReqDto,
    @User() user: UserAfterAuth,
  ): Promise<CreateVideoResDto> {
    const { mimetype, originalname, buffer } = file;
    const extension = originalname.split('.')[1];
    const { title } = createVideoReqDto;
    const command = new CreateVideoCommand(user.id, title, mimetype, extension, buffer);
    const { id } = await this.commandBus.execute(command);
    return { id, title };
  }

  @ApiBearerAuth()
  @ApiGetItemsResponse(FindVideoResDto)
  @SkipThrottle()
  @Get()
  async findAll(@Query() { page, size }: PageReqDto): Promise<FindVideoResDto[]> {
    const findVideosQuery = new FindVideosQuery(page, size);
    const videos = await this.queryBus.execute(findVideosQuery);
    return videos.map(({ id, title, user }) => {
      return {
        id,
        title,
        user: {
          id: user.id,
          email: user.email,
        },
      };
    });
  }

  @ApiBearerAuth()
  @ApiGetResponse(FindVideoResDto)
  @Get(':id')
  async findOne(@Param() { id }: FindVideoReqDto) {
    const { title, user } = await this.videoService.findOne(id);
    return {
      id,
      title,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  @ApiBearerAuth()
  @Throttle(3, 60)
  @Get(':id/download')
  async download(@Param() { id }: FindVideoReqDto, @Res({ passthrough: true }) res: Response) {
    const { stream, mimetype, size } = await this.videoService.download(id);
    res.set({
      'Content-Length': size,
      'Content-Type': mimetype,
      'Content-Disposition': 'attachment;',
    });
    return new StreamableFile(stream);
  }
}
