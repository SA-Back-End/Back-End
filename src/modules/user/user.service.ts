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
import { HardSkills, SoftSkills, StatusUser, StudyArea } from '@prisma/client';
import { State } from '@prisma/client';
import { UserFiltersDto } from './dto/user-filters.dto';

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
        project: { include: { project_Role: true } },
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
      throw new NotFoundException('Usuário não existente');
    }

    delete userExists.password;

    return userExists;
  }

  async findUserLogin(login: string) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: login }, { email: login }],
      },
      select: { id_user: true, username: true, password: true },
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não existente');
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
      throw new ConflictException('Usuário do parâmetro não existente');
    }

    // CRIAR FUNÇÃO QUE RECEBE POR PARAMETRO TODOS OS ITENS DO UPDATE, E FAZ BONITINHO MENOS CÓDIGO
    if (updateUserDto.username) {
      const usernameInUse = await this.prisma.user.findUnique({
        where: {
          username: updateUserDto.username,
        },
      });

      if (usernameInUse) {
        throw new ConflictException('Nome de usuário indisponível');
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
        throw new ConflictException('Email indisponível');
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
      throw new NotFoundException('Usuário não existente');
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
    if (followerId == followingId) {
      throw new ConflictException('Você não pode seguir você mesmo');
    }
    const alreadyFollowing = await this.prisma.user.findFirst({
      where: {
        id_user: followerId,
        followers: { some: { followingId: followingId } },
      },
    });

    if (alreadyFollowing) {
      throw new ConflictException('Você já segue este usuário');
    }

    await this.prisma.user.update({
      where: {
        id_user: followerId,
      },
      data: {
        followers: {
          create: { followingId },
        },
      },
    });

    return {
      menssage: `Você agora está seguindo o user ${alreadyFollowing.username}`,
    };
  }

  async unfollow(followerId: number, followingId: number) {
    if (followerId == followingId) {
      throw new ConflictException('Você não pode deixar de seguir você mesmo');
    }
    const doesNotFollow = await this.prisma.user.findFirst({
      where: {
        id_user: followerId,
        followers: { some: { followingId: followingId } },
      },
    });

    if (!doesNotFollow) {
      throw new ConflictException('Você não segue este usuário');
    }

    const unfollow = await this.prisma.user.update({
      where: {
        id_user: followerId,
      },
      data: {
        followers: {
          delete: { followerId_followingId: { followerId, followingId } },
        },
      },
    });
    if (unfollow) {
      return {
        menssage: `Você parou de seguir o user ${doesNotFollow.username}`,
      };
    }
  }

  async findInterested(filters: UserFiltersDto[]) {
    const whereStatement = this._transformIntoWhereStatement(filters);

    const isSearching = await this.prisma.user.findMany({
      where: {
        isSearchingForProjects: true,
        ...whereStatement,
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
      throw new NotFoundException('Desculpe, não temos candidatos no momento');
    }
    isSearching.forEach(e => delete e.password);

    return isSearching;
  }

  private _transformIntoWhereStatement(userFilter: UserFiltersDto[]): any {
    const filters = userFilter.reduce((acc, filter) => {
      const { type, value } = filter;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(value);
      return acc;
    }, {});

    const filterType = Object.keys(filters);

    const whereStatement = {
      ...filterType.reduce((acc, curr) => {
        if (
          curr === 'workType' ||
          curr === 'StatusProject' ||
          curr === 'StatusUser' ||
          curr === 'states'
        ) {
          acc[curr] = { equals: filters[curr][0] };
          return acc;
        }

        acc[curr] = { hasEvery: filters[curr] };
        return acc;
      }, {}),
    };

    return whereStatement;
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
    if (!hasStatus) {
      throw new NotFoundException(
        'Desculpe, não temos algupem com esse Status neste momento'
      );
    }
    hasStatus.forEach(e => delete e.password);
    return hasStatus;
  }

  async findUserState(state: State) {
    const findState = await this.prisma.user.findMany({
      where: {
        state: state,
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

    if (!findState) {
      throw new NotFoundException(
        'Desculpe, não temos nenhum usuário neste estado no momento'
      );
    }

    findState.forEach(e => delete e.password);
    return findState;
  }

  async findUserBySoftSkill(skills: SoftSkills[]) {
    const findSoftSkill = await this.prisma.user.findMany({
      where: {
        softSkills: { hasEvery: skills },
      },
    });
    if (findSoftSkill[0] === undefined) {
      throw new NotFoundException(
        'Desculpe, não temos nenhum candidato que atende seus requisitos'
      );
    }
    return findSoftSkill;
  }

  async findUserByHardSkill(skills: HardSkills[]) {
    const findHardSkill = await this.prisma.user.findMany({
      where: {
        hardSkills: { hasEvery: skills },
      },
    });
    if (findHardSkill[0] === undefined) {
      throw new NotFoundException(
        'Desculpe, não temos nenhum candidato que atende seus requisitos'
      );
    }
    return findHardSkill;
  }

  async findUserByStudyArea(studyArea: StudyArea[]) {
    const findStudyArea = await this.prisma.user.findMany({
      where: {
        studyArea: { hasEvery: studyArea },
      },
    });

    if (findStudyArea[0] === undefined) {
      throw new NotFoundException(
        'Desculpe, não temos nenhum candidato que atende seus requisitos'
      );
    }
    return findStudyArea;
  }

  async findNotification(username: string) {
    const followers = await this.prisma.follows.findMany({
      where: {
        following: { username },
      },
      select: {
        follow_date: true,
        following: { select: { username: true } },
      },
      orderBy: { follow_date: 'desc' },
    });

    const follows = followers.map(e => {
      return {
        date: e.follow_date,
        user: e.following.username,
        type: 'follow',
      };
    });

    const postsLikes = await this.prisma.likes.findMany({
      where: { post: { user: { username } } },
      select: {
        liker: { select: { username: true } },
        like_date: true,
      },

      orderBy: { like_date: 'desc' },
    });

    const likes = postsLikes.map(e => {
      return { date: e.like_date, user: e.liker.username, type: 'like' };
    });

    const postComments = await this.prisma.comment.findMany({
      where: { post: { user: { username } } },
      select: {
        user: { select: { username: true } },
        commentDate: true,
      },
      orderBy: { commentDate: 'desc' },
    });

    const comments = postComments.map(e => {
      return { date: e.commentDate, user: e.user.username, type: 'comment' };
    });

    const match = await this.prisma.screen_Curtidas.findMany({
      where: {
        OR: [
          { project_role: { project: { userAdmin: { username } } } },
          { user: { username } },
        ],
      },
      select: {
        match_dateTime: true,
        user: { select: { username: true } },
        project_role: {
          select: {
            user_role: true,
            project: { select: { project_name: true } },
          },
        },
      },
      orderBy: { match_dateTime: 'desc' },
    });

    const matchs = match.map(e => {
      return {
        date: e.match_dateTime,
        user: e.user.username,
        project: e.project_role.project.project_name,
        type: 'match',
      };
    });

    const notifications = [...follows, ...likes, ...comments, ...matchs];
    notifications.sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });
    return notifications;
  }
}
