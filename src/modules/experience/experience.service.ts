import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/database/PrismaService';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {

  constructor(private prisma: PrismaService) { }

  async create(createExperienceDto: CreateExperienceDto) {
    return await this.prisma.experience.create({
      data: {
        ...createExperienceDto
      }
    })
  }

  async findAll() {
    return await this.prisma.experience.findMany()
  }

  async update(id_experience: number, updateExperienceDto: UpdateExperienceDto) {
    return await this.prisma.experience.update({
      data: {
        ...updateExperienceDto
      },

      where: {
        id_experience
      }
    })
  }

  async remove(id_experience: number) {

    const experienceExists = await this.prisma.experience.findFirst({
      where: {
        id_experience
      }
    })

    if (!experienceExists) {
      throw new NotFoundException('Experiência não existe')
    }

    return await this.prisma.experience.delete({
      where: {
        id_experience
      }
    })
  }
}

