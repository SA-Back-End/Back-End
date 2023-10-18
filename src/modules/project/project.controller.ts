import { ProjectService } from './project.service';
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
import { StatusProject, StudyArea, WorkType } from '@prisma/client';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtUtilsService } from 'src/jwt_utils/jwtUtils.service';
import { ProjectFiltersDto } from './dto/project-filters.dto';

@ApiBearerAuth()
@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly JwtUtils: JwtUtilsService
  ) {}

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
  @ApiConflictResponse({ description: 'Projeto já existente', status: 409 })
  @ApiOperation({
    summary: 'Cria um projeto',
    description: 'Cria um projeto na plataforma',
  })
  async create(
    @Headers('Authorization') auth,
    @Body() createProjectDto: CreateProjectDto
  ) {
    const user = this.JwtUtils.id(auth);
    return this.projectService.create(user.id, createProjectDto);
  }

  @Public()
  @Get('/findStatusToUser/:statusProject')
  @ApiParam({ name: 'statusProject' })
  @ApiOperation({
    summary: 'Encontra o status do projeto',
    description:
      'Encontra o status do projeto na plataforma com base no id do gerente do projeto e o status do projeto',
  })
  async findStatusToId(
    @Headers('Authorization') auth,
    @Param('statusProject') statusProject: StatusProject
  ) {
    const user = this.JwtUtils.id(auth);
    return this.projectService.findStatusToId(user.id, statusProject);
  }

  @Public()
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

  @Public()
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
    summary: 'Lista projetos especificamente com a chave inserida',
    description: 'Lista projetos especificamente com base no título',
  })
  @Get('/findManyByTitle/:title')
  async findManyByTitle(@Param('title') title: string) {
    return this.projectService.findManyByTitle(title);
  }

  @Patch('/update/:id_project')
  @ApiOkResponse({
    description: 'Informações editadas com sucesso',
    type: CreateProjectDto,
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
  async update(
    @Param('id_project') idProject: number,
    @Headers('Authorization') auth,
    @Body() updateProjectDto: UpdateProjectDto
  ) {
    const user = this.JwtUtils.id(auth);
    return this.projectService.update(idProject, updateProjectDto, user.id);
  }

  @Delete('/delete/:id_project')
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
  @UseGuards(AuthGuard)
  async remove(
    @Param('id_project') idProject: number,
    @Headers('Authorization') auth
  ) {
    const user = this.JwtUtils.id(auth);
    return this.projectService.remove(idProject, user.id);
  }

  @Public()
  @Get('/findOpenProjects')
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
    summary: 'Lista de projetos em aberto',
    description: 'Lista de projetos com a opção isOpen assinalada como true',
  })
  @UseGuards(AuthGuard)
  async findOpenProjects(@Headers('Authorization') auth, @Headers('Filters') projectFilters: string) {
    const toFilter: ProjectFiltersDto[] = projectFilters ? JSON.parse(projectFilters) : null;
    const user = this.JwtUtils.id(auth);
    return this.projectService.findOpenProjects(user.id, toFilter);
  }

  @Get('/findProjectByStatus/:status')
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
    summary: 'Lista de projetos com um status específico',
    description: 'Lista de projetos com um dos status do enum colocados',
  })
  async findProjectByStatus(@Param('status') status: StatusProject) {
    return this.projectService.findProjectByStatus(status);
  }

  @Post('/findProjectByStudyArea')
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
    summary: 'Lista de projetos com as áreas de estudo especificadas',
    description:
      'Lista de projetos com todas as studyAreas presentes no array mandado',
  })
  async findProjectByStudyArea(@Body() studyArea: StudyArea[]) {
    return this.projectService.findProjectByStudyArea(studyArea);
  }

  @Get('/findProjectByWorkType/:workType')
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
    summary: 'Lista de projetos com as áreas de estudo especificadas',
    description:
      'Lista de projetos com todas as studyAreas presentes no array mandado',
  })
  async findProjectByWorkType(@Param('workType') workType: WorkType) {
    return this.projectService.findProjectByWorkType(workType);
  }
}
