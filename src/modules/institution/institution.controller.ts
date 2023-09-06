import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('institution')
@ApiTags('Institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Public()
  @Post('create')
  @ApiCreatedResponse({ description: 'Instituição criada com sucesso', type: CreateInstitutionDto, status: 201 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiNotAcceptableResponse({ description: 'Nome de instituição ou senha muito pequenos', status: 406 })
  @ApiConflictResponse({ description: 'Instituição já existente!', status: 409 })
  @ApiOperation({
    summary: 'Cria uma instituição',
    description: 'Cria uma instituição na plataforma',
  })
  async create(@Body() createInstitutionDto: CreateInstitutionDto) {
    return await this.institutionService.create(createInstitutionDto);
  }

  @Public()
  @Get('/findAll/:page')
  @ApiOkResponse({ description: 'Informações encontradas', type: CreateInstitutionDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiParam({ name: 'page', schema: { default: 1 } })
  @ApiOperation({
    summary: 'Lista todas as instituições',
    description: 'Lista todas as instituições por páginas',
  })
  async findAll(@Param('page') page: number) {
    return this.institutionService.findAll(page);
  }

  @Public()
  @ApiOkResponse({ description: 'Informações encontradas', type: CreateInstitutionDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @Get('/findOne/:id_institution')
  @ApiOperation({
    summary: 'Lista uma instituição específica',
    description: 'Lista uma instituição específica com base no id',
  })
  async findOne(@Param('id_institution') id_institution: number) {
    return this.institutionService.findOne(id_institution);
  }

  @Public()
  @ApiOkResponse({ description: 'Informações editadas com sucesso', type: UpdateInstitutionDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiNotFoundResponse({ description: 'Instituição não existente', status: 404 })
  @Patch('/update/:id_institution')
  @ApiOperation({
    summary: 'Atualiza uma instituição',
    description: 'Atualiza uma instituição com base no id',
  })
  async update(@Param('id_institution') id_institution: number, @Body() updateInstitutionDto: UpdateInstitutionDto) {
    return this.institutionService.update(id_institution, updateInstitutionDto);
  }

  @Public()
  @Delete('/delete/:id_institution')
  @ApiOkResponse({ description: 'Instituição deletada com sucesso', status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiNotFoundResponse({ description: 'Instituição não existente', status: 404 })
  @ApiOperation({
    summary: 'Deleta uma instituição',
    description: 'Deleta uma instituição com base no id',
  })
  async remove(@Param('id_institution') id_institution: number) {
    return this.institutionService.remove(id_institution);
  }
}

