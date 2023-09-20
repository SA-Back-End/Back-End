import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectRoleDto } from './dto/create-project_role.dto';
import { UpdateProjectRoleDto } from './dto/update-project_role.dto';
import { PrismaService } from './../../database/PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectRoleService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectRoleDto: CreateProjectRoleDto) {
    const roleExists = await this.prisma.project_role.findFirst({
      where: {
        id_project: createProjectRoleDto.id_project,
        user_role: createProjectRoleDto.user_role,
      },
    });
    if (roleExists) {
      throw new ConflictException('Cargo já existente');
    }

    return this.prisma.project_role.create({
      data: {
        ...createProjectRoleDto,
      },
    });
  }

  async findAll(page: number) {
    if (page == 0) {
      return this.prisma.project_role.findMany({
        include: { participation: true, project: true, screen_Curtidas: true },
      });
    } else if (page == 1) {
      return this.prisma.project_role.findMany({
        include: { participation: true, project: true, screen_Curtidas: true },
        take: 20,
      });
    } else {
      return this.prisma.project_role.findMany({
        include: { participation: true, project: true, screen_Curtidas: true },
        take: 20,
        skip: (page - 1) * 20,
      });
    }
  }

  async findOne(id_role: number) {
    const roleExists = await this.prisma.project_role.findFirst({
      where: {
        id_role: id_role,
      },
      include: { participation: true },
    });

    if (!roleExists) {
      throw new NotFoundException('Cargo não existe');
    }

    return roleExists;
  }

  async acceptParticipation(idRole: number, idUserToAccept: number, idRequisitionMaker: number) {
    const roleExists = await this.prisma.project_role.findFirst({
      where: {
        id_role: idRole,
      }
    });

    const userToAcceptExists = await this.prisma.user.findUnique({
      where: {
        id_user: idUserToAccept
      }
    })

    const requisitionMakerExists = await this.prisma.user.findUnique({
      where: {
        id_user: idRequisitionMaker
      }
    })

    if (!roleExists) {
      throw new NotFoundException('Cargo não existe');
    } else if(!userToAcceptExists) {
      throw new NotFoundException('Usuário não existe');
    } else if(!requisitionMakerExists) {
      throw new NotFoundException('Dono da requisição não existe');
    } 

    const like = await this.prisma.screen_Curtidas.findMany({
      where:{id_role: idRole, id_candidate: idUserToAccept}
    })

    if(like.length < 2) {
      throw new ConflictException("Aguardando confirmação da outra parte.")
    } else if (like.length == 2){
      return this.prisma.project_role.update({
        where: {
          id_role: idRole,
        },
        data: {
          participation: { create: { id_user: idUserToAccept } }, isOpen: false,
        },
      });
    }
  }

  async fireUser(
    idRequisitionMaker: number,
    idRole: number,
    idUserToFire: number
  ) {
    const roleExists = await this.prisma.project_role.findFirst({
      where: {
        id_role: idRole,
      },
    });
    if (!roleExists) {
      throw new NotFoundException('Cargo não existe');
    }

    const userToFireExists = await this.prisma.project_role.findFirst({
      where: {
        id_role: idRole,
        participation: { some: { user: { id_user: idUserToFire } } },
      },
    });
    if (!userToFireExists) {
      throw new NotFoundException(
        'Usuário para Demitir não participa do Projeto'
      );
    }

    if (idRequisitionMaker === idUserToFire) {
      return await this.prisma.project_role.update({
        where: {
          id_role: idRole,
        },
        data: {
          participation: { deleteMany: [{ id_user: idUserToFire }] },
        },
      });
    } else {
      const userManagerExists = await this.prisma.project_role.findFirst({
        where: {
          id_role: idRole,
          project: { id_projectManager: idRequisitionMaker },
        },
      });

      if (!userManagerExists) {
        throw new NotFoundException(
          'Usuário não tem Permissão para Demitir nesse Cargo'
        );
      }
      return await this.prisma.project_role.update({
        where: {
          id_role: idRole,
          project: { id_projectManager: idRequisitionMaker },
        },
        data: {
          participation: { deleteMany: [{ id_user: idUserToFire }] }, isOpen: true
        },
      });
    }
  }

  async update(id_role: number, updateProjectRoleDto: UpdateProjectRoleDto) {
    const idInUse = await this.prisma.project_role.findUnique({
      where: {
        id_role: id_role,
      },
    });
    if (!idInUse) {
      throw new ConflictException('Cargo não existe');
    }
    return await this.prisma.project_role.update({
      data: {
        ...updateProjectRoleDto,
      },
      where: {
        id_role: id_role,
      },
    });
  }

  async remove(id_role: number) {
    const roleExists = await this.prisma.project_role.findUnique({
      where: {
        id_role: id_role,
      },
    });
    if (!roleExists) {
      throw new NotFoundException('Cargo não existe');
    }
    return await this.prisma.project_role.delete({
      where: {
        id_role: id_role,
      },
    });
  }
}
