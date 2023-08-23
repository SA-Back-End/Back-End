import { PrismaService } from './../../database/PrismaService';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) { }

  async create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        userId: createPostDto.userId,
        text: createPostDto.text,
        post_img: createPostDto.post_img
      },
    })
  }

  async findAll(page: number) {
    if (page == 0) {
      return this.prisma.post.findMany({
      });
    } else if (page == 1) {
      return this.prisma.post.findMany({
        take: 20,
      });
    } else {
      return this.prisma.post.findMany({
        take: 20,
        skip: (page - 1) * 20,
      });
    }
  }

  async findOne(id: number) {
    const postExists = await this.prisma.post.findFirst({
      where: {
        id : id
      }
    })

    if (!postExists) {
      throw new NotFoundException('Postagem não existe')
    }

    return postExists;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const idInUse = await this.prisma.post.findUnique({
      where: {
        id: id,
      }
    })

    if (idInUse) {
      throw new ConflictException('postname indisponível')
    }

    return await this.prisma.post.update({
      data: {
        userId: updatePostDto.userId,
        text: updatePostDto.text,
        post_img: updatePostDto.post_img,
      },
      where: {
        id
      }
    })
  }

  async remove(id: number) {
    const postExists = await this.prisma.post.delete({
      where: {
        id: id
      }
    })

    if (!postExists) {
      throw new NotFoundException('Postagem não existe')
    }

    return await this.prisma.post.delete({
      where: {
        id,
      }
    })
  }
}
