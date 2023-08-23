import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {

  constructor(private prisma: PrismaService) { }

  create(createExperienceDto: CreateExperienceDto) {
    return this.prisma.experience.create({
      data: {
        ...createExperienceDto
      }
    })
  }

  findAll() {
    return `This action returns all experience`;
  }

  findOne(id: number) {
    return `This action returns a #${id} experience`;
  }

  update(id: number, updateExperienceDto: UpdateExperienceDto) {
    return `This action updates a #${id} experience`;
  }

  remove(id: number) {
    return `This action removes a #${id} experience`;
  }
}
