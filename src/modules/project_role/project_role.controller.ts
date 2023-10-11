import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { ProjectRoleService } from './project_role.service';
import { CreateProjectRoleDto } from './dto/create-project_role.dto';
import { UpdateProjectRoleDto } from './dto/update-project_role.dto';
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
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtUtilsService } from 'src/jwt_utils/jwtUtils.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@ApiTags('Project_Role')
@Controller('project-role')
export class ProjectRoleController {
  constructor(
    private readonly projectRoleService: ProjectRoleService,
    private readonly JwtUtils: JwtUtilsService
  ) {}

  @Post('create')
  @ApiCreatedResponse({
    description: 'Cargo criado com sucesso',
    type: CreateProjectRoleDto,
    status: 201,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiNotAcceptableResponse({
    description: 'Nome de cargo muito pequeno',
    status: 406,
  })
  @ApiConflictResponse({ description: 'Cargo já existente', status: 409 })
  @ApiOperation({
    summary: 'Deleta um cargo do projeto',
    description: 'Deleta um cargo do projeto com base no id',
  })
  async create(@Body() createProjectRoleDto: CreateProjectRoleDto) {
    return this.projectRoleService.create(createProjectRoleDto);
  }

  @Public()
  @Get('/findAll/:page')
  @ApiOkResponse({
    description: 'Informações encontradas',
    type: CreateProjectRoleDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiOperation({
    summary: 'Lista todos os cargos do projeto',
    description: 'Lista todos os cargos do projeto por páginas',
  })
  @ApiParam({ name: 'page', schema: { default: 1 } })
  async findAll(@Param('page') page: number) {
    return this.projectRoleService.findAll(page);
  }

  @Public()
  @ApiOkResponse({
    description: 'Informações encontradas',
    type: CreateProjectRoleDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @Get('/findOne/:id_role')
  @ApiOperation({
    summary: 'Lista um cargo do projeto específico',
    description: 'Lista um cargo do projeto específico com base no id do cargo',
  })
  async findOne(@Param('id_role') id_role: number) {
    return this.projectRoleService.findOne(id_role);
  }

  @Patch('/acceptUser/:idRole/:idUser/')
  @ApiParam({ name: 'idRole' })
  @ApiParam({ name: 'idUser' })
  @ApiOperation({
    summary:
      'Aceita um usuário em um cargo do projeto ou aceita o convite de participar de um projeto',
    description:
      'Aceita um usuário de um cargo do projeto com base no id do cargo e id do usuário a ser aceito',
  })
  @UseGuards(AuthGuard)
  async acceptParticipation(
    @Param('idRole') idRole: number,
    @Param('idUser') idUser: number,
    @Headers('Authorization') auth
  ) {
    const user = this.JwtUtils.id(auth);

    return this.projectRoleService.acceptParticipation(idRole, idUser, user.id);
  }

  @Patch('/fireUser/:idRole/:idUser')
  @ApiParam({ name: 'idRole' })
  @ApiParam({ name: 'idUser' })
  @ApiOperation({
    summary: 'Demite um usuário de um cargo do projeto ou se demite do projeto',
    description:
      'Demite um usuário de um cargo do projeto com base no id do cargo e id do usuário a ser demitido',
  })
  @UseGuards(AuthGuard)
  async fireUser(
    @Headers('Authorization') auth,
    @Param('idRole') idRole: number,
    @Param('idUser') idUser: number
  ) {
    const user = this.JwtUtils.id(auth);

    return this.projectRoleService.fireUser(user.id, idRole, idUser);
  }

  @ApiOkResponse({
    description: 'Informações editadas com sucesso',
    type: UpdateProjectRoleDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiNotFoundResponse({ description: 'Cargo não existente', status: 404 })
  @ApiOperation({
    summary: 'Atualiza um cargo do projeto',
    description: 'Atualiza um cargo do projeto com base no id do cargo',
  })
  @Patch('/update/:id_role')
  async update(
    @Param('id_role') id_role: number,
    @Body() updateProjectRoleDto: UpdateProjectRoleDto
  ) {
    return this.projectRoleService.update(id_role, updateProjectRoleDto);
  }

  @Delete('/delete/:id_role')
  @ApiOkResponse({ description: 'Cargo deletado com sucesso', status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiNotFoundResponse({ description: 'Cargo não existente', status: 404 })
  @ApiOperation({
    summary: 'Deleta um cargo do projeto',
    description: 'Deleta um cargo do projeto com base no id do cargo',
  })
  remove(@Param('id_role') id_role: number) {
    return this.projectRoleService.remove(id_role);
  }
}
