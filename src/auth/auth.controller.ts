/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LogUserDto } from './dto/log-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() logUserDto: LogUserDto) {
    return this.authService.signIn(logUserDto.username, logUserDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    const user = {
      id: req.user.id,
      username: req.user.username,
    }
    return user;
  }
}