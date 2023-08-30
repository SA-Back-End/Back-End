import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Screen_Stick')
@Controller('screen-stick')
export class ScreenStickController {
  constructor(private readonly screenStickService: ScreenStickService) {}

  @Public()
  @Post('create')
  @ApiCreatedResponse({description: 'Curtido com Sucesso', type: CreateScreenStickDto, status: 201})
  @ApiBadRequestResponse({description: 'Requisição inválida', status: 400})
  async create(@Body() createScreenStickDto: CreateScreenStickDto) {
    return this.screenStickService.create(createScreenStickDto);
  }

  @Get('findAll/:page')
  @ApiOkResponse({description: 'Curtida encontrada', type: CreateScreenStickDto, status: 200})
  @ApiBadRequestResponse({description: 'Requisição Inválida', status: 400})
  @ApiUnauthorizedResponse({description: 'Acesso não autorizado', status: 401})
  @ApiParam({name: 'page', schema: {default:1}})
  async findAll(@Param('page') page: number) {
    return this.screenStickService.findAll(page);
  }

  @ApiOkResponse({description: 'Curtida encontrada', type: CreateScreenStickDto, status: 200})
  @ApiBadRequestResponse({description: 'Requisição Inválida', status: 400})
  @ApiUnauthorizedResponse({description: 'Acesso não autorizado', status: 401})
  @ApiNotFoundResponse({ description: 'Curtida não existente', status: 404 })
  @Get('/findOne/:screenId')
  async findOne(@Param('screenId') screenId: number) {
    return this.screenStickService.findOne(screenId);
  }

  @ApiOkResponse({ description: 'Informações editadas com sucesso', type: UpdateScreenStickDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiNotFoundResponse({ description: 'Curtida não existente', status: 404 })
  @Patch('/update/:screenId')
  async update(@Param('screenid') screenId: number, @Body() updateScreenStickDto: UpdateScreenStickDto) {
    return this.screenStickService.update(screenId, updateScreenStickDto);
  }

  @Public()
  @Delete('/delete/:screenId')
  @ApiOkResponse({description: 'Curtida deletada com sucesso', status: 200})
  @ApiBadRequestResponse({description: 'Requisição inválida', status: 400})
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiNotFoundResponse({ description: 'Curtida não existente', status: 404 })
  async remove(@Param('screenId') screenId: number) {
    return this.screenStickService.remove(screenId);
  }
}
