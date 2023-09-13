import { ProjectService } from './project.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

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
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { StatusProject } from '@prisma/client';

@ApiBearerAuth()
@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Public()
  @Post('create')
  @ApiCreatedResponse({
    description: 'Postagem criada com sucesso',
    type: CreateProjectDto,
    status: 201,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiNotAcceptableResponse({
    description: 'Nome de projeto muito pequeno',
    status: 406,
  })
  @ApiConflictResponse({ description: 'Projeto já existente!', status: 409 })
  @ApiOperation({
    summary: 'Cria um projeto',
    description: 'Cria um projeto na plataforma',
  })
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Public()
  @Get('/findStatusToUser/:idProjectManager/:statusProject')
  @ApiParam({ name: 'idProjectManager' })
  @ApiParam({ name: 'statusProject' })
  @ApiOperation({
    summary: 'Encontra o status do projeto',
    description:
      'Encontra o status do projeto na plataforma com base no id do gerente do projeto e o status do projeto',
  })
  async findStatusToId(
    @Param('idProjectManager') idProjectManager: number,
    @Param('statusProject') statusProject: StatusProject
  ) {
    return this.projectService.findStatusToId(idProjectManager, statusProject);
  }

  @Get('/findAll/:page')
  @ApiOkResponse({
    description: 'Informações encontradas',
    type: CreateProjectDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiParam({ name: 'page', schema: { default: 1 } })
  @ApiOperation({
    summary: 'Lista todas as experiência',
    description: 'Lista todas as experiência por páginas',
  })
  async findAll(@Param('page') page: number) {
    return this.projectService.findAll(page);
  }

  @ApiOkResponse({
    description: 'Informações encontradas',
    type: CreateProjectDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiOperation({
    summary: 'Lista um projeto específico',
    description: 'Lista um projeto específico com base no título',
  })
  @Get('/findOne/:title')
  async findOne(@Param('title') title: string) {
    return this.projectService.findOne(title);
  }

  @ApiOkResponse({ description: 'Informações encontradas', type: CreateProjectDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiOperation({
    summary: 'Lista projetos especificamente com a chave inserida',
    description: 'Lista projetos especificamente com base no título',
  })
  @Get('/findManyByTitle/:title')
  async findManyByTitle(@Param('title') title: string) {
    return this.projectService.findManyByTitle(title);
  }

  @ApiOkResponse({
    description: 'Informações editadas com sucesso',
    type: UpdateProjectDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiOperation({
    summary: 'Atualiza um projeto',
    description: 'Atualiza um projeto com base no id',
  })
  @ApiNotFoundResponse({ description: 'Postagem não existente', status: 404 })
  @Patch('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto
  ) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete('/delete/:id')
  @ApiOkResponse({ description: 'Usuário deletado com sucesso', status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiNotFoundResponse({ description: 'Usuário não existente', status: 404 })
  @ApiOperation({
    summary: 'Deleta um projeto',
    description: 'Deleta um projeto com base no id',
  })
  async remove(@Param('id') id: number) {
    return this.projectService.remove(id);
  }
}
