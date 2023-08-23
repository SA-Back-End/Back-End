import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class InstitutionService {
  constructor(private prisma: PrismaService) { }

  async create(createInstitutionDto: CreateInstitutionDto) { 
    const institution = await this.prisma.institution.create({
      data: {
        ...createInstitutionDto,
      }
    });
    return {data: institution};
  }

  async findAll(page: number) {
    if (page == 0) {
      return this.prisma.institution.findMany({
      });
    } else if (page == 1) {
      return this.prisma.institution.findMany({
        take: 20,
      });
    } else {
      return this.prisma.institution.findMany({
        take: 20,
        skip: (page - 1) * 20,
      });
    }
  }

  async findOne(id_institutions: number) {
    const institutionExists = await this.prisma.institution.findFirst({
      where: {
        id_institution: id_institutions
      }
    })
    if (!institutionExists) {
      throw new NotFoundException('Instituição não existe.')
    }
    return institutionExists;
  }

  update(id: number, updateInstitutionDto: UpdateInstitutionDto) {
    return `This action updates a #${id} institution`;
  }

  remove(id: number) {
    return `This action removes a #${id} institution`;
  }
}
