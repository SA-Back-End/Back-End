import { PrismaService } from './../../database/PrismaService';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        userId: createPostDto.userId,
        text: createPostDto.text,
        post_img: createPostDto.post_img,
      },
    });
  }

  async findAll(page: number) {
    if (page == 0) {
      return this.prisma.post.findMany({
        include: {
          user: { select: { username: true } },
          comments: true,
          likedBy: { select: { username: true } },
        },
      });
    } else if (page == 1) {
      return this.prisma.post.findMany({
        include: {
          user: { select: { username: true } },
          comments: true,
          likedBy: { select: { username: true } },
        },
        take: 20,
      });
    } else {
      return this.prisma.post.findMany({
        include: {
          user: { select: { username: true } },
          comments: true,
          likedBy: { select: { username: true } },
        },
        take: 20,
        skip: (page - 1) * 20,
      });
    }
  }

  async findOne(id: number) {
    const postExists = await this.prisma.post.findFirst({
      where: {
        id_post: id,
      },
      include: {
        user: { select: { username: true } },
        comments: true,
        likedBy: { select: { username: true } },
      },
    });

    if (!postExists) {
      throw new NotFoundException('Postagem não existe');
    }

    return postExists;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const idInUse = await this.prisma.post.findUnique({
      where: {
        id_post: id,
      },
    });

    if (idInUse) {
      throw new ConflictException('postname indisponível');
    }

    return await this.prisma.post.update({
      data: {
        userId: updatePostDto.userId,
        text: updatePostDto.text,
        post_img: updatePostDto.post_img,
      },
      where: {
        id_post: id,
      },
    });
  }

  async remove(id: number) {
    const postExists = await this.prisma.post.delete({
      where: {
        id_post: id,
      },
    });

    if (!postExists) {
      throw new NotFoundException('Postagem não existe');
    }

    return await this.prisma.post.delete({
      where: {
        id_post: id,
      },
    });
  }

  async likePost(idPost: number, idUser: number) {
    const postToLike = await this.prisma.post.findUnique({
      where: {
        id_post: idPost,
      },
    });

    if (!postToLike) {
      throw new ConflictException('Post não Existe');
    }

    const user = await this.prisma.user.findUnique({
      where: { id_user: idUser },
    });

    if (!user) {
      throw new ConflictException('Usuário não Existe');
    }

    return this.prisma.post.update({
      where: { id_post: idPost },
      data: { likedBy: { connect: { id_user: idUser } } },
    });
  }

  async deslikePost(idPost: number, idUser: number) {
    const postToLike = await this.prisma.post.findUnique({
      where: {
        id_post: idPost,
      },
    });

    if (!postToLike) {
      throw new ConflictException('Post não Existe');
    }

    const user = await this.prisma.user.findUnique({
      where: { id_user: idUser },
    });

    if (!user) {
      throw new ConflictException('Usuário não Existe');
    }

    return this.prisma.post.update({
      where: { id_post: idPost },
      data: { likedBy: { disconnect: { id_user: idUser } } },
    });
  }

  async commentPost(idPost: number, comment: CreateCommentDto) {
    const postToComment = await this.prisma.post.findUnique({
      where: {
        id_post: idPost,
      },
    });

    if (!postToComment) {
      throw new ConflictException('Post não Existe');
    }

    const user = await this.prisma.user.findUnique({
      where: { id_user: comment.idUser },
    });

    if (!user) {
      throw new ConflictException('Usuário não Existe');
    }

    return this.prisma.post.update({
      where: { id_post: idPost },
      data: {
        comments: {
          create: { message: comment.message, userId: comment.idUser },
        },
      },
    });
  }

  async commentDelete(idPost: number, idComment: number, idUser: number) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: idUser },
    });

    if (!user) {
      throw new ConflictException('Usuário não Existe');
    }

    const postToComment = await this.prisma.post.findUnique({
      where: {
        id_post: idPost,
      },
    });

    if (!postToComment) {
      throw new ConflictException('Post não Existe');
    }

    const commentExists = await this.prisma.comment.findUnique({
      where: { id_comment: idComment },
    });

    if (!commentExists) {
      throw new ConflictException('Comentário não Existe');
    }

    if (commentExists.userId == idUser || postToComment.userId == idUser) {
      await this.prisma.post.update({
        where: { id_post: idPost },
        data: { comments: { delete: { id_comment: idComment } } },
      });
      return {
        error: false,
        message: 'Comentário deletado com sucesso!',
        status: 200,
      };
    }
    throw new ConflictException(
      'Você não tem permissão para deletar esse comentário'
    );
  }
}
