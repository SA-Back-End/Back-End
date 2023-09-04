import { ProjectService } from './project.service';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

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
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { StatusProject } from '@prisma/client';

@ApiBearerAuth()
@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Public()
  @Post('create')
  @ApiCreatedResponse({ description: 'Postagem criada com sucesso', type: CreateProjectDto, status: 201 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiNotAcceptableResponse({ description: 'Nome de projeto muito pequeno', status: 406 })
  @ApiConflictResponse({ description: 'Projeto já existente!', status: 409 })
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Public()
  @Get('/findStatusToUser/:idProjectManager/:statusProject')
  @ApiParam({name:'idProjectManager'})
  @ApiParam({name:'statusProject'})
  async findStatusToId(@Param('idProjectManager') idProjectManager: number, @Param('statusProject') statusProject: StatusProject){
    return this.projectService.findStatusToId(idProjectManager, statusProject)
  }

  @Get('/findAll/:page')
  @ApiOkResponse({ description: 'Informações encontradas', type: CreateProjectDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiParam({ name: 'page', schema: { default: 1 } })
  async findAll(@Param('page') page: number) {
    return this.projectService.findAll(page);
  }

  @ApiOkResponse({ description: 'Informações encontradas', type: CreateProjectDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @Get('/findOne/:title')
  async findOne(@Param('title') title: string) {
    return this.projectService.findOne(title);
  }

  @ApiOkResponse({ description: 'Informações editadas com sucesso', type: UpdateProjectDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiNotFoundResponse({ description: 'Postagem não existente', status: 404 })
  @Patch('/update/:id')
  async update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete('/delete/:id')
  @ApiOkResponse({ description: 'Usuário deletado com sucesso', status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiNotFoundResponse({ description: 'Usuário não existente', status: 404 })
  async remove(@Param('id') id: number) {
    return this.projectService.remove(id);
  }
}
