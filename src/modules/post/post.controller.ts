import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
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
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiBearerAuth()
@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Public()
  @Post('create')
  @ApiCreatedResponse({
    description: 'Postagem criada com sucesso',
    type: CreatePostDto,
    status: 201,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiOperation({
    summary: 'Cria um post',
    description: 'Cria um post na plataforma',
  })
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Public()
  @Get('/findAll/:page')
  @ApiOkResponse({
    description: 'Informações encontradas',
    type: CreatePostDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiParam({ name: 'page', schema: { default: 1 } })
  @ApiOperation({
    summary: 'Lista todos os posts',
    description: 'Lista todos os posts por páginas',
  })
  async findAll(@Param('page') page: number) {
    return this.postService.findAll(page);
  }

  @Public()
  @ApiOkResponse({
    description: 'Informações encontradas',
    type: CreatePostDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @Get('/findOne/:id')
  @ApiOperation({
    summary: 'Lista um post específico',
    description: 'Lista um post específico com base no título',
  })
  async findOne(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @Public()
  @ApiOkResponse({
    description: 'Informações editadas com sucesso',
    type: UpdatePostDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiNotFoundResponse({ description: 'Postagem não existente', status: 404 })
  @Patch('/update/:id')
  @ApiOperation({
    summary: 'Atualiza um post',
    description: 'Atualiza um post com base no id',
  })
  async update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Public()
  @Delete('/delete/:id')
  @ApiOkResponse({ description: 'Usuário deletado com sucesso', status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiNotFoundResponse({ description: 'Usuário não existente', status: 404 })
  @ApiOperation({
    summary: 'Deleta um post',
    description: 'Deleta um post com base no id',
  })
  async remove(@Param('id') id: number) {
    return this.postService.remove(id);
  }

  @ApiOkResponse({
    description: 'Informações editadas com sucesso',
    type: UpdatePostDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiNotFoundResponse({ description: 'Postagem não existente', status: 404 })
  @Patch('/like/:idPost/:idUser')
  @ApiOperation({
    summary: 'Curtir um post',
    description: 'Curte um post com base no id',
  })
  async like(@Param('idPost') idPost: number, @Param('idUser') idUser: number) {
    return this.postService.likePost(idPost, idUser);
  }

  @ApiOkResponse({
    description: 'Informações editadas com sucesso',
    type: UpdatePostDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiNotFoundResponse({ description: 'Postagem não existente', status: 404 })
  @Patch('/deslike/:idPost/:idUser')
  @ApiOperation({
    summary: 'Deixar de Curtir um post',
    description: 'Deixar de Curtir um post com base no id',
  })
  async deslike(
    @Param('idPost') idPost: number,
    @Param('idUser') idUser: number
  ) {
    return this.postService.deslikePost(idPost, idUser);
  }

  @ApiOkResponse({
    description: 'Informações editadas com sucesso',
    type: UpdatePostDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiNotFoundResponse({ description: 'Postagem não existente', status: 404 })
  @Patch(':idPost/comment/')
  @ApiOperation({
    summary: 'Comentar um post',
    description: 'Comente em um post com base no id',
  })
  async comment(
    @Param('idPost') idPost: number,
    @Body() comment: CreateCommentDto
  ) {
    return this.postService.commentPost(idPost, comment);
  }

  @ApiOkResponse({
    description: 'Informações editadas com sucesso',
    type: UpdatePostDto,
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({
    description: 'Acesso não autorizado',
    status: 401,
  })
  @ApiNotFoundResponse({ description: 'Postagem não existente', status: 404 })
  @Patch(':idPost/comment/delete/:idComment')
  @ApiOperation({
    summary: 'Deletar um Comentário',
    description: 'delete em um comentário com base no id',
  })
  async commentDelete(
    @Query('idUser') idUser: number,
    @Param('idPost') idPost: number,
    @Param('idComment') idComment: number
  ) {
    return this.postService.commentDelete(idPost, idComment, idUser);
  }
}
