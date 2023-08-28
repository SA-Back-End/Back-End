import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormationService } from './formation.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('formation')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Formação criado com sucesso', type: CreateFormationDto, status: 201 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiNotAcceptableResponse({ description: 'Formação ou senha muito pequenos', status: 406 })
  @ApiConflictResponse({ description: 'Formação já existente!', status: 409 })
  create(@Body() createFormationDto: CreateFormationDto) {
    return this.formationService.create(createFormationDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Informações encontradas', type: CreateFormationDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  findAll() {
    return this.formationService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Informações encontradas', type: CreateFormationDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  findOne(@Param('id') id: string) {
    return this.formationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Informações editadas com sucesso', type: UpdateFormationDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiNotFoundResponse({ description: 'Formação não existente', status: 404 })
  update(@Param('id') id: string, @Body() updateFormationDto: UpdateFormationDto) {
    return this.formationService.update(+id, updateFormationDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Formação deletado com sucesso', status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiNotFoundResponse({ description: 'Formação não existente', status: 404 })
  remove(@Param('id') id: string) {
    return this.formationService.remove(+id);
  }
}
