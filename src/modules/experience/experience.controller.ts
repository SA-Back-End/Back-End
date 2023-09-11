import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiTags, ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiUnauthorizedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('experience')
@ApiTags('Experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Public()
  @Post('create')
  @ApiCreatedResponse({ description: 'Experiência criada com sucesso', type: CreateExperienceDto, status: 201 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiNotAcceptableResponse({ description: 'Nome da Experiência ou senha muito pequenas', status: 406 })
  @ApiConflictResponse({ description: 'Experiência já existente!', status: 409 })
  @ApiOperation({
    summary: 'Cria uma experiência',
    description: 'Cria uma experiência na plataforma',
  })
  async create(@Body() CreateExperienceDto: CreateExperienceDto) {
    return await this.experienceService.create(CreateExperienceDto);
  }

  @Public()
  @Get('/findAll/:page')
  @ApiOkResponse({ description: 'Informações encontradas', type: CreateExperienceDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiParam({ name: 'page', schema: { default: 1 } })
  @ApiOperation({
    summary: 'Lista todas as experiência',
    description: 'Lista todas as experiência por páginas',
  })
  async findAll(@Param('page') page: number) {
    return this.experienceService.findAll(page);
  }
  
  @Public()
  @ApiOkResponse({ description: 'Informações encontradas', type: CreateExperienceDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @Get('/findOne/:id_experience')
  @ApiOperation({
    summary: 'Lista uma experiência específica',
    description: 'Lista uma experiência específica com base no id',
  })
  async findOne(@Param('id_experience') id_experience: number) {
    return this.experienceService.findOne(id_experience);
  }

  @Public()
  @ApiOkResponse({ description: 'Informações editadas com sucesso', type: CreateExperienceDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiNotFoundResponse({ description: 'Experiência não existente', status: 404 })
  @Patch('/update/:id_experience')
  @ApiOperation({
    summary: 'Atualiza uma experiência',
    description: 'Atualiza uma experiência com base no id',
  })
  async update(@Param('id_experience') id_experience: number, @Body() UpdateExperienceDto: UpdateExperienceDto) {
    return this.experienceService.update(id_experience, UpdateExperienceDto);
  }

  @Public()
  @Delete('/delete/:id_experience')
  @ApiOkResponse({ description: 'Experiência deletada com sucesso', status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiNotFoundResponse({ description: 'Experiência não existente', status: 404 })
  @ApiOperation({
    summary: 'Deleta uma experiência',
    description: 'Deleta uma experiência com base no id',
  })
  async remove(@Param('id_experience') id_experience: number) {
    return this.experienceService.remove(id_experience);
  }
}