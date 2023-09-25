import { PrismaService } from './../../database/PrismaService';
import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, StatusProject, StudyArea } from '@prisma/client';
import IProjectRemoveResponse from './helpers/interfaces/IProjectDeleteResponse';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) { }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
      }
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

  async findAll(page: number): Promise<Project[]> {
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

  async findOne(project_name: string): Promise<Project | NotFoundException> {
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
      throw new NotFoundException('Projeto não existente');
    }

    return projectExists;
  }

  async findManyByTitle(key: string): Promise<Project[]> {

    const projectsNearestKey = await this.prisma.project.findMany({
      where: { project_name: { contains: key, mode: 'insensitive' } }
    })

    return projectsNearestKey;
  }

  async update(id_project: number, updateProjectDto: UpdateProjectDto, idProjectManager: number): Promise<Project | ConflictException> {
    const projectToUpdate = await this.prisma.project.findUnique({
      where: {
        id_project,
      },
    });

    if (!projectToUpdate) throw new ConflictException('Id project inválido');
    if (projectToUpdate.id_projectManager !== idProjectManager) throw new ConflictException(`Usuário sem permição para fazer alterações`);

    return await this.prisma.project.update({
      data: {
        ...updateProjectDto,
      },
      where: {
        id_project
      },
    });
  }

  async remove(id_project: number, idProjectManager: number): Promise< IProjectRemoveResponse | ConflictException > {
    const projectToUpdate = await this.prisma.project.findUnique({
      where: {
        id_project,
      },
    });

    if (!projectToUpdate) throw new NotFoundException('Projeto não existente');
    if (projectToUpdate.id_projectManager !== idProjectManager) throw new ConflictException(`Usuário sem permição para excluir o projeto`);

    const hadSucceded = await this.prisma.project.delete({
      where: {
        id_project,
      },
    });

    if (hadSucceded) {
      return {
        error: false,
        message: 'Projeto deletado com sucesso!',
        status: 200,
      }
    }
    throw new ConflictException('Erro ao deletar projeto');
  }

  async findOpenProjects(){
    const isOpenProjects = await this.prisma.project.findMany({
      where: {
        project_Role: { some: {isOpen: true}}
      },
      include: { project_Role: true },
    });

    if (!isOpenProjects) {
      throw new NotFoundException('Desculpe, não temos projetos no momento');
    }

    return isOpenProjects;
  }

  async findProjectByStatus(status: StatusProject) {
    const findStatus = await this.prisma.project.findMany({
      where: {
        status: status,
      },
      include: {userAdmin: {
        select: {
          id_user: true,
          username: true,
        },
      }, 
      project_Role: true},
    });
    if(!findStatus) {
      throw new NotFoundException("Desculpe, não temos projeto no momento");
    }

    return findStatus;
  }

  async findProjectByStudyArea(studyArea: StudyArea[]) {
    const findStudyArea = await this.prisma.project.findMany({
      where: {
        studyArea: { hasEvery: studyArea}
      }
    });
    if(findStudyArea[0] === undefined) {
      throw new NotFoundException("Desculpe, não temos projeto no momento");
    }
    return findStudyArea
  }
    
}

