import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';
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
import {
  HardSkills,
  SoftSkills,
  State,
  StatusUser,
  StudyArea,
} from '@prisma/client';
import { JwtUtilsService } from 'src/jwt_utils/jwtUtils.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserFiltersDto } from './dto/user-filters.dto';

@Controller('user')
@ApiBearerAuth()
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly JwtUtils: JwtUtilsService
  ) {}

  @Public()
  @Post('create')
  @ApiCreatedResponse({
    description: 'Usuário criado com sucesso',
    type: CreateUserDto,
    status: 201,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiNotAcceptableResponse({
    description: 'Usuário ou senha muito pequenos',
    status: 406,
  })
  @ApiConflictResponse({ description: 'Usuário já existente', status: 409 })
  @ApiOperation({
    summary: 'Cria um usuário',
    description: 'Cria uma usuário na plataforma',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  // @Public()
  @Get('/findAll/:page')
  @ApiOkResponse({
    description: 'Informações encontradas',
    type: CreateUserDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiParam({ name: 'page', schema: { default: 1 } })
  @ApiOperation({
    summary: 'Lista todos os usuários',
    description: 'Lista todoso os usuários por páginas',
  })
  async findAll(@Param('page') page: number) {
    return this.userService.findAll(page);
  }

  @Public()
  @ApiOkResponse({
    description: 'Informações encontradas',
    type: CreateUserDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiOperation({
    summary: 'Lista um usuário específico',
    description: 'Lista um usuário específico com base no username',
  })
  @Get('/findOne/:username')
  async findOne(
    @Param('username') username: string,
    @Headers('Authorization') auth
  ) {
    if (auth) {
      const user = await this.JwtUtils.id(auth);
      if (user.username == username) {
        const data = await this.userService.findOne(username);
        return { ...data, isMe: true };
      } else {
        const data = await this.userService.findOne(username);
        return { ...data, isMe: false };
      }
    } else {
      const data = await this.userService.findOne(username);
      return { ...data, isMe: false };
    }
  }

  @Public()
  @ApiOkResponse({
    description: 'Informações encontradas',
    type: CreateUserDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiOperation({
    summary: 'Lista usuários conforme a busca',
    description:
      'Lista usuários com base na key fornecida nos usernames ou nome',
  })
  @Get('/findByUserNameAndName/:key')
  async findByUserNameAndName(@Param('key') key: string) {
    return this.userService.findByUserNameAndName(key);
  }

  @ApiOkResponse({
    description: 'Informações editadas com sucesso',
    type: UpdateUserDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiNotFoundResponse({ description: 'Usuário não existente', status: 404 })
  @ApiOperation({
    summary: 'Atualiza um usuário',
    description: 'Atualiza um usuário com base no username',
  })
  @Patch('/update/:username')
  async update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(username, updateUserDto);
  }

  @Delete('/delete/:usernameToDelete')
  @ApiOkResponse({ description: 'Usuário deletado com sucesso', status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiNotFoundResponse({ description: 'Usuário não existente', status: 404 })
  @ApiOperation({
    summary: 'Deleta um usuário',
    description: 'Deleta um usuário com base no username',
  })
  @UseGuards(AuthGuard)
  async remove(
    @Headers('Authorization') auth,
    @Param('usernameToDelete') usernameToDelete: string
  ) {
    const user = this.JwtUtils.id(auth);
    return this.userService.remove(user.username, usernameToDelete);
  }

  @Patch('/follow/:followerId')
  @ApiOkResponse({
    description: 'Usuário seguido com sucesso',
    type: CreateUserDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiOperation({
    summary: 'Seguir um usuário',
    description:
      'Seguir um usuário baseado em seu id, followingId é quem segue, followerId é quem é seguido',
  })
  async follow(
    @Headers('Authorization') auth,
    @Param('followerId') followerId: number
  ) {
    const user = this.JwtUtils.id(auth);
    return this.userService.follow(followerId, user.id);
  }

  @Patch('/unfollow/:followerId')
  @ApiOkResponse({
    description: 'Usuário deixado de ser seguido com sucesso',
    type: CreateUserDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiOperation({
    summary: 'Deixar de seguir',
    description:
      'Deixar de seguir um usuário baseado em seu id, followingId é quem segue, followerId é quem é seguido',
  })
  async unfollow(
    @Headers('Authorization') auth,
    @Param('followerId') followerId: number
  ) {
    const user = this.JwtUtils.id(auth);
    return this.userService.unfollow(followerId, user.id);
  }

  @Public()
  @Get('/findInterested')
  @ApiOkResponse({
    description: 'Informações encontradas',
    type: CreateUserDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiOperation({
    summary: 'Lista usuários interessados em participar de um projeto',
    description:
      'Lista usuários com a opção isSearchingForProjects assinalada como true',
  })
  async findInterested(@Headers('Filters') userFilters: string) {
    const toFilter: UserFiltersDto[] = userFilters
      ? JSON.parse(userFilters)
      : null;
    return this.userService.findInterested(toFilter);
  }

  @Get('/findUserBasedOnStatus/:status')
  @ApiOkResponse({
    description: 'Informações encontradas',
    type: CreateUserDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiOperation({
    summary: 'Lista usuários com o status procurado',
    description:
      'Lista usuários com o status procurado pelo usuário, pego do enum',
  })
  async findUserBasedOnStatus(@Param('status') status: StatusUser) {
    return this.userService.findUserBasedOnStatus(status);
  }

  @Get('/findUserState/:state')
  @ApiOkResponse({
    description: 'Informações encontradas',
    type: CreateUserDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiOperation({
    summary: 'Lista usuários no estado procurado',
    description:
      'Lista usuários baseado no estado onde moram de acordo com o banco',
  })
  async findUserState(@Param('state') state: State) {
    return this.userService.findUserState(state);
  }

  @Public()
  @Post('/findUserBySoftSkill')
  @ApiOkResponse({
    description: 'Informações encontradas',
    type: CreateUserDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiOperation({
    summary: 'Lista usuários com a softSkill procurada',
    description:
      'Lista usuários com todas as softSkills procuradas em um array.',
  })
  async findUserBySoftSkill(@Body() skills: SoftSkills[]) {
    return this.userService.findUserBySoftSkill(skills);
  }

  @Post('/findUserByHardSkill')
  @ApiOkResponse({
    description: 'Informações encontradas',
    type: CreateUserDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiOperation({
    summary: 'Lista usuários com a hardSkill procurada',
    description:
      'Lista usuários com todas as hasdSkills procuradas em um array.',
  })
  async findUserByHardSkill(@Body() skills: HardSkills[]) {
    return this.userService.findUserByHardSkill(skills);
  }

  @Post('/findUserByStudyArea')
  @ApiOkResponse({
    description: 'Informações encontradas',
    type: CreateUserDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiOperation({
    summary: 'Lista de usuários com as áreas de estudo especificadas',
    description:
      'Lista de usuários com todas as studyAreas presentes no array mandado',
  })
  async findUserByStudyArea(@Body() studyArea: StudyArea[]) {
    return this.userService.findUserByStudyArea(studyArea);
  }

  @ApiOkResponse({
    description: 'Informações encontradas',
    type: CreateUserDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiOperation({
    summary: 'Lista as notificações de um usuário específico',
    description: 'Lista as notificações de um usuário específico por data',
  })
  @Get('/notifications')
  async Notifications(@Headers('Authorization') auth) {
    const user = this.JwtUtils.id(auth);
    return this.userService.findNotification(user.username);
  }
}
