import { PrismaService } from './../../database/PrismaService';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { prismaExclude } from './helper/prismaExclude';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
        username: createUserDto.username,
      },
    })

    if (userExists) {
      throw new ConflictException('Usuário já cadastrado');
    }

    const salt = await bcrypt.genSalt();
    const hash: string = await bcrypt.hash(createUserDto.password, salt);
    const dataJson = createUserDto.profilePicture as unknown as Prisma.JsonObject;

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        profilePicture: dataJson,
        password: hash
      },
    })
  }

  async findAll(page: number) {
    if (page == 0) {
      return this.prisma.user.findMany({
        select: prismaExclude('User', ['password'])
      });
    } else if (page == 1) {
      return this.prisma.user.findMany({
        take: 20,
        select: prismaExclude('User', ['password'])
      });
    } else {
      return this.prisma.user.findMany({
        take: 20,
        skip: (page - 1) * 20,
        select: prismaExclude('User', ['password'])
      });
    }
  }

  async findOne(username: string) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        username
      }
    })

    if (!userExists) {
      throw new NotFoundException('Usuário não existe')
    }

    return userExists;
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    const usernameInUse = await this.prisma.user.findUnique({
      where: {
        username: username
      }
    })

    if (usernameInUse) {
      throw new ConflictException('Username indisponível')
    }

    const dataJson = updateUserDto.profilePicture as unknown as Prisma.JsonObject;
    return await this.prisma.user.update({

      data: {
        ...updateUserDto,
        profilePicture: dataJson,
      },
      
      where: {
        username
      }
    })
  }

  async remove(username: string) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        username
      }
    })

    if (!userExists) {
      throw new NotFoundException('Usuário não existe')
    }

    return await this.prisma.user.delete({
      where: {
        username
      }
    })
  }
}
