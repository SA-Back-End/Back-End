import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class InstitutionService {
  constructor(private prisma: PrismaService) { }

  async create(createInstitutionDto: CreateInstitutionDto) { 
   return await this.prisma.institution.create({
      data: {
        ...createInstitutionDto,
      }
    });
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

  async update(id_institution: number, updateInstitutionDto: UpdateInstitutionDto) {
    const idInUse = await this.prisma.institution.findUnique({
      where: {
        id_institution: id_institution,
      }
    })
    if (idInUse) {
      throw new ConflictException('This institution already exists')
    }
    
    return await this.prisma.institution.update({
      data: {
        ...updateInstitutionDto,
      },
      where: {
        id_institution: id_institution,
      }
    });
  }

  async remove(id_institution: number) {
    const institutionExists = await this.prisma.institution.findFirst({
      where: {
        id_institution :  id_institution
      }
    })

    if (!institutionExists) {
      throw new NotFoundException('Instituição não existente')
    }

    return await this.prisma.institution.delete({
      where: {
        id_institution : id_institution
      }
    })
  }
}