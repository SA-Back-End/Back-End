import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Public()
  @Post('create')
  @ApiCreatedResponse({ description: 'Instituição criada com sucesso', type: CreateInstitutionDto, status: 201 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiNotAcceptableResponse({ description: 'Nome de instituição ou senha muito pequenos', status: 406 })
  @ApiConflictResponse({ description: 'Instituição já existente!', status: 409 })
  async create(@Body() createInstitutionDto: CreateInstitutionDto) {
    return await this.institutionService.create(createInstitutionDto);
  }

  @Public()
  @Get('/findAll/:page')
  @ApiOkResponse({ description: 'Informações encontradas', type: CreateInstitutionDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiParam({ name: 'page', schema: { default: 1 } })
  async findAll(@Param('page') page: number) {
    return this.institutionService.findAll(page);
  }

  @Public()
  @ApiOkResponse({ description: 'Informações encontradas', type: CreateInstitutionDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @Get('/findOne/:institution_name')
  async findOne(@Param('institution_name') id_institutions: string) {
    return this.institutionService.findOne(id_institutions);
  }

  @Public()
  @ApiOkResponse({ description: 'Informações editadas com sucesso', type: UpdateInstitutionDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiNotFoundResponse({ description: 'Instituição não existente', status: 404 })
  @Patch('/update/:institution_name')
  async update(@Param('institution_name') institution_name: string, @Body() updateInstitutionDto: UpdateInstitutionDto) {
    return this.institutionService.update(institution_name, updateInstitutionDto);
  }

  @Public()
  @Delete('/delete/:institution_name')
  @ApiOkResponse({ description: 'Instituição deletada com sucesso', status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiNotFoundResponse({ description: 'Instituição não existente', status: 404 })
  async remove(@Param('institution_name') institution_name: string) {
    return this.institutionService.remove(institution_name);
  }
}

