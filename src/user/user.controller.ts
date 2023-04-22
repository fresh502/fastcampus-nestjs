import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { FindUserReqDto } from './dto/req.dto';
import { PageReqDto } from 'src/common/dto/req.dto';
import { ApiGetItemsResponse, ApiGetResponse } from 'src/common/decorator/swagger.decorator';
import { FindUserResDto } from './dto/res.dto';

@ApiTags('User')
@ApiExtraModels(FindUserReqDto, FindUserResDto)
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiGetItemsResponse(FindUserResDto)
  @Get()
  findAll(@Query() { page, size }: PageReqDto) {
    return this.userService.findAll();
  }

  @ApiGetResponse(FindUserResDto)
  @Get(':id')
  findOne(@Param() { id }: FindUserReqDto) {
    return this.userService.findOne(id);
  }
}
