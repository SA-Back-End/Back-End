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

  async create(userId: number, createPostDto: CreatePostDto) {
    if (createPostDto.post_img_url.length > 3) {
      throw new ConflictException('Máximo de Imagens Excedido');
    }

    return this.prisma.post.create({
      data: {
        userId: userId,
        text: createPostDto.text,
        post_img_url: createPostDto.post_img_url,
      },
    });
  }

  async findAll(page: number) {
    if (page == 0) {
      return this.prisma.post.findMany({
        include: {
          user: { select: { username: true } },
          comments: true,
          likedBy: {
            select: { like_date: true, liker: { select: { username: true } } },
          },
        },
      });
    } else if (page == 1) {
      return this.prisma.post.findMany({
        include: {
          user: { select: { username: true } },
          comments: true,
          likedBy: {
            select: { like_date: true, liker: { select: { username: true } } },
          },
        },
        take: 20,
      });
    } else {
      return this.prisma.post.findMany({
        include: {
          user: { select: { username: true } },
          comments: true,
          likedBy: {
            select: { like_date: true, liker: { select: { username: true } } },
          },
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
        likedBy: { select: { liker: { select: { username: true } } } },
      },
    });

    if (!postExists) {
      throw new NotFoundException('Postagem não existente');
    }

    return postExists;
  }

  async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
    const idInUse = await this.prisma.post.findUnique({
      where: {
        id_post: id,
      },
    });

    if (!idInUse) {
      throw new ConflictException('Postagem não existente');
    }

    if (updatePostDto.post_img_url) {
      const imgs = [...idInUse.post_img_url, ...updatePostDto.post_img_url];

      if (imgs.length > 3) {
        if (updatePostDto.post_img_url.length > 3) {
          throw new ConflictException('Máximo de Imagens Excedido');
        }
        return await this.prisma.post.update({
          data: {
            userId: userId,
            text: updatePostDto.text,
            post_img_url: updatePostDto.post_img_url,
          },
          where: {
            id_post: id,
          },
        });
      }

      return await this.prisma.post.update({
        data: {
          userId: userId,
          text: updatePostDto.text,
          post_img_url: imgs,
        },
        where: {
          id_post: id,
        },
      });
    }
    return await this.prisma.post.update({
      data: {
        userId: userId,
        text: updatePostDto.text,
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
      throw new NotFoundException('Postagem não existente');
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
      throw new ConflictException('Postagem não existente');
    }

    const user = await this.prisma.user.findUnique({
      where: { id_user: idUser },
    });

    if (!user) {
      throw new ConflictException('Usuário não existente');
    }

    return this.prisma.post.update({
      where: { id_post: idPost },
      data: { likedBy: { create: { likerId: idUser } } },
      include: {
        likedBy: {
          select: { like_date: true, liker: { select: { username: true } } },
        },
      },
    });
  }

  async deslikePost(idPost: number, idUser: number) {
    const postToLike = await this.prisma.post.findUnique({
      where: {
        id_post: idPost,
      },
    });

    if (!postToLike) {
      throw new ConflictException('Postagem não existente');
    }

    const user = await this.prisma.user.findUnique({
      where: { id_user: idUser },
    });

    if (!user) {
      throw new ConflictException('Usuário não existente');
    }

    return this.prisma.post.update({
      where: { id_post: idPost },
      data: {
        likedBy: { deleteMany: { likerId: idUser } },
      },
      include: {
        likedBy: {
          select: { like_date: true, liker: { select: { username: true } } },
        },
      },
    });
  }

  async commentPost(idPost: number, comment: CreateCommentDto) {
    const postToComment = await this.prisma.post.findUnique({
      where: {
        id_post: idPost,
      },
    });

    if (!postToComment) {
      throw new ConflictException('Postagem não existente');
    }

    const user = await this.prisma.user.findUnique({
      where: { id_user: comment.idUser },
    });

    if (!user) {
      throw new ConflictException('Usuário não existente');
    }

    return this.prisma.post.update({
      where: { id_post: idPost },
      data: {
        comments: {
          create: { message: comment.message, userId: comment.idUser },
        },
      },
      select: { comments: true },
    });
  }

  async commentDelete(idPost: number, idComment: number, idUser: number) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: idUser },
    });

    if (!user) {
      throw new ConflictException('Usuário não existente');
    }

    const postToComment = await this.prisma.post.findUnique({
      where: {
        id_post: idPost,
      },
    });

    if (!postToComment) {
      throw new ConflictException('Postagem não existente');
    }

    const commentExists = await this.prisma.comment.findUnique({
      where: { id_comment: idComment },
    });

    if (!commentExists) {
      throw new ConflictException('Comentário não existente');
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
