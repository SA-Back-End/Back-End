import { PrismaService } from './../../database/PrismaService';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) { }

  async create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        ...createProjectDto
      },
    })
  }

  async findAll(page: number) {
    if (page == 0) {
      return this.prisma.project.findMany({
        include:{userAdmin:true},
      });
    } else if (page == 1) {
      return this.prisma.project.findMany({
        include:{userAdmin:true},
        take: 20,
      });
    } else {
      return this.prisma.project.findMany({
        include:{userAdmin:true},
        take: 20,
        skip: (page - 1) * 20,
      });
    }
  }

  async findOne(project_name: string) {
    const projectExists = await this.prisma.project.findFirst({
      where: {
        project_name: project_name
      }
    })

    if (!projectExists) {
      throw new NotFoundException('Projeto não existe')
    }

    return projectExists;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const idInUse = await this.prisma.project.findUnique({
      where: {
        id_project: id,
      }
    })

    if (idInUse) {
      throw new ConflictException('projectname indisponível')
    }

    return await this.prisma.project.update({
      data: {
        ...updateProjectDto,
      },
      where: {
        id_project: id
      }
    })
  }

  async remove(id: number) {
    const projectExists = await this.prisma.project.delete({
      where: {
        id_project: id
      }
    })

    if (!projectExists) {
      throw new NotFoundException('Projeto não existe')
    }

    return await this.prisma.project.delete({
      where: {
        id_project: id,
      }
    })
  }
}
