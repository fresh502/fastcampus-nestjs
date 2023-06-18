import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PageReqDto {
  @ApiPropertyOptional({ description: '페이지. default = 1' })
  @Transform((param) => Number(param.value))
  @IsInt()
  page?: number = 1;

  @ApiPropertyOptional({ description: '페이지당 데이터 갯수. default = 20' })
  @Transform((param) => Number(param.value))
  @IsInt()
  size?: number = 20;
}
