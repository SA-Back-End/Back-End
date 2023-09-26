import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormationService } from './formation.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('formation')
@ApiTags('Formation')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  
  @Post('create')
  @ApiCreatedResponse({ description: 'Formação criada com sucesso', type: CreateFormationDto, status: 201 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiNotAcceptableResponse({ description: 'Nome da Formação ou senha muito pequenos', status: 406 })
  @ApiConflictResponse({ description: 'Formação já existente', status: 409 })
  @ApiOperation({
    summary: 'Cria uma formação',
    description: 'Cria uma formação na plataforma',
  })
  async create(@Body() CreateFormationDto: CreateFormationDto) {
    return await this.formationService.create(CreateFormationDto);
  }

  @Public()
  @Get('/findAll/:page')
  @ApiOkResponse({ description: 'Informações encontradas', type: CreateFormationDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiParam({ name: 'page', schema: { default: 1 } })
  @ApiOperation({
    summary: 'Lista todas as formações',
    description: 'Lista todas as formações por páginas',
  })
  async findAll(@Param('page') page: number) {
    return this.formationService.findAll(page);
  }
  
  @Public()
  @ApiOkResponse({ description: 'Informações encontradas', type: CreateFormationDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @Get('/findOne/:id_formation')
  @ApiOperation({
    summary: 'Lista uma formação específica',
    description: 'Lista uma formação específica com base no id',
  })
  async findOne(@Param('id_formation') id_formation: number) {
    return this.formationService.findOne(id_formation);
  }

  
  @ApiOkResponse({ description: 'Informações editadas com sucesso', type: CreateFormationDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiNotFoundResponse({ description: 'Formação não existente', status: 404 })
  @Patch('/update/:id_formation')
  @ApiOperation({
    summary: 'Atualiza uma formação',
    description: 'Atualiza uma formação com base no id',
  })
  async update(@Param('id_formation') id_formation: number, @Body() UpdateFormationDto: UpdateFormationDto) {
    return this.formationService.update(id_formation, UpdateFormationDto);
  }

 
  @Delete('/delete/:id_formation')
  @ApiOkResponse({ description: 'Formação deletada com sucesso', status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiNotFoundResponse({ description: 'Formação não existente', status: 404 })
  @ApiOperation({
    summary: 'Deleta uma formação',
    description: 'Deleta uma formação com base no id',
  })
  async remove(@Param('id_formation') id_formation: number) {
    return this.formationService.remove(id_formation);
  }
}