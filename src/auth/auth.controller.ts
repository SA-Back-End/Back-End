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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/modules/user/user.service';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LogUserDto } from './dto/log-user-dto';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

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
  async getProfile(@Request() req) {
    const user = {
      id: req.user.id,
      username: req.user.username,
    };
    return await this.userService.findOne(user.username);
  }
}
