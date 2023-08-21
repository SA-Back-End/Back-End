import { PrismaService } from './../../database/PrismaService';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

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

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hash
      },
    })
  }

  async findAll(page: number) {
    if (page == 0) {
      const res = await this.prisma.user.findMany({
        include: {posts: true, userProjects: true}
      });
      res.forEach( e=> delete e.password)
      return res

    } else if (page == 1) {
      const res = await this.prisma.user.findMany({
        include: {posts: true, userProjects: true},
        take: 20,
      });
      res.forEach( e=> delete e.password)
      return res
    } else {
      const res = await this.prisma.user.findMany({
        include: {posts: true, userProjects: true},
        take: 20,
        skip: (page - 1) * 20,
      });
      res.forEach( e=> delete e.password)
      return res
    }
  }

  async findOne(username: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        username
      },
      include: {posts: true, userProjects: true}
    });
    delete userExists.password

    if (!userExists) {
      throw new NotFoundException('Usuário não existe')
    }

    return userExists;
  }

  async findUserLogin(username: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        username
      },
      select: { id: true, username: true, password: true }
    })

    if (!userExists) {
      throw new NotFoundException('Usuário não existe')
    }

    return userExists;
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username
      }
    })
    
    if (!user) {
      throw new ConflictException('Usuário do parâmetro não existe!')
    }
    
    // CRIAR FUNÇÃO QUE RECEBE POR PARAMETRO TODOS OS ITENS DO UPDATE, E FAZ BONITINHO MENOS CÓDIGO
    if (updateUserDto.username) {
      const usernameInUse = await this.prisma.user.findUnique({
        where: {
          username: updateUserDto.username
        }
      })
      
      if (usernameInUse) {
        throw new ConflictException('Nome de usuário indisponível!')
      }
    }
    
    // CRIAR FUNÇÃO QUE RECEBE POR PARAMETRO TODOS OS ITENS DO UPDATE, E FAZ BONITINHO MENOS CÓDIGO
    if (updateUserDto.email) {
      const emailInUse = await this.prisma.user.findUnique({
        where: {
          email: updateUserDto.email
        }
      })

      if (emailInUse) {
        throw new ConflictException('Email indisponível!')
      }
    }

    return await this.prisma.user.update({

      data: {
        ...updateUserDto,
      },

      where: {
        username
      },

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
