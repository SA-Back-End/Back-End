import { PrismaService } from './../../database/PrismaService';
import {
  ConflictException,
  Delete,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { stat } from 'fs';
import { StatusUser } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, username } = createUserDto;

    const userExists = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (userExists) {
      throw new ConflictException('Usuário já cadastrado');
    }

    const emailExists = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (emailExists) {
      throw new ConflictException('Email já cadastrado');
    }

    const salt = await bcrypt.genSalt();
    const hash: string = await bcrypt.hash(createUserDto.password, salt);

    const name = `${createUserDto.firstName} ${createUserDto.lastName}`;
    delete createUserDto.firstName;
    delete createUserDto.lastName;

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hash,
        name,
      },
    });
  }

  async findAll(page: number) {
    if (page == 0) {
      const res = await this.prisma.user.findMany({
        include: {
          posts: true,
          project: true,
          sticky: true,
          participation: true,
          likes: true,
          formation: true,
          following: { select: { followerId: true } },
          followers: { select: { followingId: true } },
          experience: true,
          certificate: true,
        },
      });
      res.forEach(e => delete e.password);
      return res;
    } else if (page == 1) {
      const res = await this.prisma.user.findMany({
        include: {
          posts: true,
          project: true,
          sticky: true,
          participation: true,
          likes: true,
          formation: true,
          following: { select: { followerId: true } },
          followers: { select: { followingId: true } },
          experience: true,
          certificate: true,
        },
        take: 20,
      });
      res.forEach(e => delete e.password);
      return res;
    } else {
      const res = await this.prisma.user.findMany({
        include: {
          posts: true,
          project: true,
          sticky: true,
          participation: true,
          likes: true,
          formation: true,
          following: { select: { followerId: true } },
          followers: { select: { followingId: true } },
          experience: true,
          certificate: true,
        },
        take: 20,
        skip: (page - 1) * 20,
      });
      res.forEach(e => delete e.password);
      return res;
    }
  }

  async findByUserNameAndName(key: string) {
    const usersNearestKey = await this.prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: key, mode: 'insensitive' } },
          { username: { contains: key } },
        ],
      },
    });

    usersNearestKey.forEach(e => delete e.password);

    return usersNearestKey;
  }

  async findOne(username: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        posts: true,
        project: true,
        sticky: true,
        participation: true,
        likes: true,
        formation: true,
        following: { select: { followerId: true } },
        followers: { select: { followingId: true } },
        experience: true,
        certificate: true,
      },
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não existe');
    }

    delete userExists.password;

    return userExists;
  }

  async findUserLogin(username: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        username,
      },
      select: { id_user: true, username: true, password: true },
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não existe');
    }

    return userExists;
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new ConflictException('Usuário do parâmetro não existe!');
    }

    // CRIAR FUNÇÃO QUE RECEBE POR PARAMETRO TODOS OS ITENS DO UPDATE, E FAZ BONITINHO MENOS CÓDIGO
    if (updateUserDto.username) {
      const usernameInUse = await this.prisma.user.findUnique({
        where: {
          username: updateUserDto.username,
        },
      });

      if (usernameInUse) {
        throw new ConflictException('Nome de usuário indisponível!');
      }
    }

    // CRIAR FUNÇÃO QUE RECEBE POR PARAMETRO TODOS OS ITENS DO UPDATE, E FAZ BONITINHO MENOS CÓDIGO
    if (updateUserDto.email) {
      const emailInUse = await this.prisma.user.findUnique({
        where: {
          email: updateUserDto.email,
        },
      });

      if (emailInUse) {
        throw new ConflictException('Email indisponível!');
      }
    }

    return await this.prisma.user.update({
      data: {
        ...updateUserDto,
      },

      where: {
        username,
      },
    });
  }

  async remove(usernameAdmin: string, usernameToDelete: string) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        username: usernameAdmin,
      },
    });

    const userDeleteExists = await this.prisma.user.findFirst({
      where: {
        username: usernameToDelete,
      },
    });

    if (!userExists || !userDeleteExists) {
      throw new NotFoundException('Usuário não existe');
    }
    console.log(usernameAdmin, usernameToDelete);

    if (usernameAdmin == usernameToDelete) {
      return await this.prisma.user.delete({
        where: {
          username: usernameToDelete,
        },
      });
    } else if (userExists.isAdmin == true) {
      return await this.prisma.user.delete({
        where: {
          username: usernameToDelete,
        },
      });
    } else {
      throw new ConflictException('Ação não autorizada');
    }
  }

  async follow(followerId: number, followingId: number) {
    const alreadyFollowing = await this.prisma.user.findFirst({
      where: {
        id_user: followerId,
        followers: { some: { followingId: followingId } },
      },
    });

    if (followerId == followingId) {
      throw new ConflictException('Você não pode seguir você mesmo');
    }

    if (alreadyFollowing) {
      throw new ConflictException('Você já segue este usuário');
    }

    return this.prisma.user.update({
      where: {
        id_user: followerId,
      },
      data: {
        followers: { create: { followingId: followingId } },
      },
    });
  }

  async unfollow(followerId: number, followingId: number) {
    const doesNotFollow = await this.prisma.user.findFirst({
      where: {
        id_user: followerId,
        followers: { some: { followingId: followingId } },
      },
    });

    if (!doesNotFollow) {
      throw new ConflictException('Você não segue este usuário');
    }

    return this.prisma.user.update({
      where: {
        id_user: followingId,
      },
      data: {
        following: { deleteMany: [{ followerId: followerId }] },
      },
    });
  }

  async findInterested() {
    const isSearching = await this.prisma.user.findMany({
      where: {
        isSearchingForProjects: true,
      },
      include: {
        posts: true,
        project: true,
        sticky: true,
        participation: true,
        likes: true,
        formation: true,
        following: { select: { followerId: true } },
        followers: { select: { followingId: true } },
        experience: true,
        certificate: true,
      },
    });

    if (!isSearching) {
      throw new NotFoundException('Desculpe, não temos candidatos no momento.');
    }
    isSearching.forEach(e => delete e.password);

    return isSearching;
  }

  async findUserBasedOnStatus(status: StatusUser) {
    const hasStatus = await this.prisma.user.findMany({
      where: {
        status: status,
      },
      include: {
        posts: true,
        project: true,
        sticky: true,
        participation: true,
        likes: true,
        formation: true,
        following: { select: { followerId: true } },
        followers: { select: { followingId: true } },
        experience: true,
        certificate: true,
      },
    });
    if(!hasStatus) {
      throw new ConflictException("Desculpe, não temos algupem com esse Status neste momento.");
    }
    hasStatus.forEach(e => delete e.password);
    return hasStatus;
  }
}
