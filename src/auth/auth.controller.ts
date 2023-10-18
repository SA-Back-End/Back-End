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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
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
    description:
      'Mostra as informações do usuário logado na API - Enviar o Token pelo Headers',
  })
  @ApiOkResponse({
    description: 'Informações encontradas',
    type: CreateUserDto,
    status: 200,
  })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado - Provavelmente Token Expirado',
    status: 401,
  })
  async getProfile(@Request() req) {
    const user = {
      id: req.user.id,
      username: req.user.username,
    };
    return await this.userService.findOne(user.username);
  }
}
