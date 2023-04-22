import { Controller, Request, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiExtraModels, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { SigninReqDto, SignupReqDto } from './dto/req.dto';
import { SigninResDto, SignupResDto } from './dto/res.dto';
import { ApiPostResponse } from 'src/common/decorator/swagger.decorator';

@ApiTags('Auth')
@ApiExtraModels(SignupResDto, SigninResDto)
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiPostResponse(SignupResDto)
  @Post('signup')
  async signup(@Body() { email, password, passwordConfirm }: SignupReqDto) {
    if (password !== passwordConfirm) throw new BadRequestException();
    const { id } = await this.authService.signup(email, password);
    return { id };
  }

  @ApiPostResponse(SigninResDto)
  @Post('signin')
  async signin(@Body() { email, password }: SigninReqDto) {
    return this.authService.signin(email, password);
  }
}
