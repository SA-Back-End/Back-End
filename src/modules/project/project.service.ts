import { PrismaService } from './../../database/PrismaService';
import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, StatusProject } from '@prisma/client';
import { from } from 'rxjs';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
      },
    });
  }

  async findStatusToId(
    id_projectManager: number,
    status: StatusProject
  ): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: {
        id_projectManager,
        status,
      },
    });
  }

  async findAll(page: number) {
    if (page == 0) {
      return this.prisma.project.findMany({
        include: {
          userAdmin: {
            select: {
              id_user: true,
              username: true,
            },
          },
          project_Role: {
            include: { participation: true, screen_Curtidas: true },
          },
        },
      });
    } else if (page == 1) {
      return this.prisma.project.findMany({
        include: {
          userAdmin: {
            select: {
              id_user: true,
              username: true,
            },
          },
          project_Role: {
            include: { participation: true, screen_Curtidas: true },
          },
        },
        take: 20,
      });
    } else {
      return this.prisma.project.findMany({
        include: {
          userAdmin: {
            select: {
              id_user: true,
              username: true,
            },
          },
          project_Role: {
            include: { participation: true, screen_Curtidas: true },
          },
        },
        take: 20,
        skip: (page - 1) * 20,
      });
    }
  }

  async findOne(project_name: string) {
    const projectExists = await this.prisma.project.findFirst({
      where: {
        project_name: project_name,
      },
      include: {
        project_Role: {
          include: { participation: true, screen_Curtidas: true },
        },
        userAdmin: {
          select: {
            id_user: true,
            username: true,
          },
        },
      },
    });

    if (!projectExists) {
      throw new NotFoundException('Projeto não existe');
    }

    return projectExists;
  }

  async findManyByTitle(key: string){
    
    const projectsNearestKey = await this.prisma.project.findMany({
      where: { project_name: { contains: key, mode:'insensitive' } }
    })

    return projectsNearestKey;
  }

  async update(id_project: number, updateProjectDto: UpdateProjectDto, id_projectManager: number) {
    const projectToUpdate = await this.prisma.project.findUnique({
      where: {
        id_project,
      },
    });

    if (!projectToUpdate) throw new ConflictException('Id project inválido');
    if ( projectToUpdate.id_projectManager !== id_projectManager ) throw new ConflictException('Usuário sem permição de exclusão');

    return await this.prisma.project.update({
      data: {
        ...updateProjectDto,
      },
      where: {
        id_project
      },
    });
  }

  async remove(id_project: number, idProjectManager: number) {
    const projectExists = await this.prisma.project.findUnique({
      where: {
        id_project,
      },
    });

    if (!projectExists) {
      throw new NotFoundException('Projeto não existe');
    }

    return await this.prisma.project.delete({
      where: {
        id_project,
      },
    });
  }
}
