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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LogUserDto } from './dto/log-user-dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    summary: 'Recebe a token de login',
    description: 'Recebe a Bearer Token para autenticação do usuário na API',
  })
  signIn(@Body() logUserDto: LogUserDto) {
    return this.authService.signIn(logUserDto.login, logUserDto.password);
  }

  @Get('profile')
  @ApiOperation({
    summary: 'Mostra as informações do usuário',
    description: 'Mostra as informações do usuário logado na API',
  })
  getProfile(@Request() req) {
    const user = {
      id: req.user.id,
      username: req.user.username,
    };
    return user;
  }
}
