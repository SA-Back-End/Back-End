import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { ScreenStickService } from './screen_stick.service';
import { CreateScreenStickDto } from './dto/create-screen_stick.dto';
import { UpdateScreenStickDto } from './dto/update-screen_stick.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtUtilsService } from 'src/jwt_utils/jwtUtils.service';

@ApiBearerAuth()
@ApiTags('Screen_Stick')
@Controller('screen-stick')
export class ScreenStickController {
  constructor(
    private readonly screenStickService: ScreenStickService,
    private readonly JwtUtils: JwtUtilsService
  ) {}

  @Public()
  @Post('create')
  @ApiCreatedResponse({
    description: 'Curtido com Sucesso',
    type: CreateScreenStickDto,
    status: 201,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiOperation({
    summary: 'Cria uma curtida',
    description: 'Cria uma curtida na plataforma',
  })
  async create(
    @Body() createScreenStickDto: CreateScreenStickDto,
    @Headers('Authorization') auth
  ) {
    const user = this.JwtUtils.id(auth);
    return this.screenStickService.create(createScreenStickDto, user.id);
  }

  @Public()
  @Get('findAll/:page')
  @ApiOkResponse({
    description: 'Curtida encontrada',
    type: CreateScreenStickDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição Inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiParam({ name: 'page', schema: { default: 1 } })
  @ApiOperation({
    summary: 'Lista todas as curtidas',
    description: 'Lista todas as curtidas por páginas',
  })
  async findAll(@Param('page') page: number) {
    return this.screenStickService.findAll(page);
  }

  @Public()
  @ApiOkResponse({
    description: 'Curtida encontrada',
    type: CreateScreenStickDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição Inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiNotFoundResponse({ description: 'Curtida não existente', status: 404 })
  @Get('/findOne/:id_stick')
  @ApiOperation({
    summary: 'Lista uma curtida específica',
    description: 'Lista uma curtida específica com base no id',
  })
  async findOne(@Param('id_stick') id_stick: number) {
    return this.screenStickService.findOne(id_stick);
  }

  @ApiOkResponse({
    description: 'Informações editadas com sucesso',
    type: UpdateScreenStickDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiNotFoundResponse({ description: 'Curtida não existente', status: 404 })
  @Patch('/update/:id_stick')
  @ApiOperation({
    summary: 'Atualiza uma curtida',
    description: 'Atualiza uma curtida com base no id',
  })
  async update(
    @Param('id_stick') id_stick: number,
    @Body() updateScreenStickDto: UpdateScreenStickDto
  ) {
    return this.screenStickService.update(id_stick, updateScreenStickDto);
  }

  @Delete('/delete/:id_stick')
  @ApiOkResponse({ description: 'Curtida deletada com sucesso', status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiNotFoundResponse({ description: 'Curtida não existente', status: 404 })
  @ApiOperation({
    summary: 'Deleta uma curtida',
    description: 'Deleta uma curtida com base no id',
  })
  async remove(@Param('id_stick') id_stick: number) {
    return this.screenStickService.remove(id_stick);
  }
}
