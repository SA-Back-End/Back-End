import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/database/PrismaService';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(private prisma: PrismaService) {}

  async create(createExperienceDto: CreateExperienceDto) {
    return await this.prisma.experience.create({
      data: {
        ...createExperienceDto,
      },
    });
  }

  async findAll(page: number) {
    if (page == 0) {
      return this.prisma.experience.findMany({
      });
    } else if (page == 1) {
      return this.prisma.experience.findMany({
        take: 20,
      });
    } else {
      return this.prisma.experience.findMany({
        take: 20,
        skip: (page - 1) * 20,
      });
    }
  }

  async findOne(id_experience: number) {
    const experienceExists = await this.prisma.experience.findUnique({
      where: {
        id_experience: id_experience
      }
    })

    if (!experienceExists) {
      throw new NotFoundException('Experiência não existe')
    }

    return experienceExists
  }

  async update(id_experience: number, updateExperienceDto: UpdateExperienceDto) {
    const experienceExists = await this.prisma.experience.findUnique({
      where: {
        id_experience: id_experience
      }
    })

    if (!experienceExists) {
      throw new NotFoundException('Experiência não existe')
    }
    
    return await this.prisma.experience.update({
      data: {
        ...updateExperienceDto,
      },
      where: {
        id_experience,
      }
    });
  }

  async remove(id_experience: number) {
    const experienceExists = await this.prisma.experience.findFirst({
      where: {
        id_experience,
      },
    });

    if (!experienceExists) {
      throw new NotFoundException('Experiência não existe');
    }

    return await this.prisma.experience.delete({
      where: {
        id_experience,
      },
    });
  }
}
