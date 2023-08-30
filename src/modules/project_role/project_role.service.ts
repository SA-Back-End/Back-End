import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
        user_role:  createProjectRoleDto.user_role,
      }
    })
    if(roleExists) {
      throw new ConflictException('Cargo já existente')
    }

    return this.prisma.project_role.create({
      data: {
        ...createProjectRoleDto
      }
    })

  }

  async findAll(page: number) {
    if(page == 0) {
      return this.prisma.project_role.findMany({
        include: {participation: true, project: true, screen_Curtidas: true}
      })
    } else if (page == 1) {
      return this.prisma. project_role.findMany({
        include: {participation: true, project: true, screen_Curtidas: true}
        ,take: 20})
    } else {
      return this.prisma.project_role.findMany({
        include: {participation: true, project: true, screen_Curtidas: true}
        ,take: 20, skip: (page-1)*20})
    }
  }

  async findOne(id_role: number) {
    const roleExists = await this.prisma.project_role.findFirst({
      where: {
        id_role: id_role,
      }
    })
    
    if(!roleExists) {
      throw new NotFoundException('Cargo não existe')
    }
    
    return roleExists;
  }

  async update(id_role: number, updateProjectRoleDto: UpdateProjectRoleDto) {
    const idInUse = await this.prisma.project_role.findUnique({
      where: {
        id_role: id_role
      }
    })
    if(!idInUse) {
      throw new ConflictException('Cargo não existe')
    }
    return await this.prisma.project_role.update({
      data: {
        ...updateProjectRoleDto
      },
      where: {
        id_role: id_role
      }
    })
  }

  async remove(id_role: number) {
    const roleExists = await this.prisma.project_role.findUnique({
      where: {
        id_role: id_role
      }
    })
    if(!roleExists) {
      throw new NotFoundException('Cargo não existe')
    }
    return await this.prisma.project_role.delete({
      where: {
        id_role: id_role
      }
    })
  }
}
