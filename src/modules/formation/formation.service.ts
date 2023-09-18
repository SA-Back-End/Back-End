import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateFormationDto } from './dto/create-formation.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UpdateFormationDto } from './dto/update-formation.dto';

@Injectable()
export class FormationService {
  constructor(private prisma: PrismaService) {}

  async create(createFormationDto: CreateFormationDto) {
    return await this.prisma.formation.create({
      data: {
        ...createFormationDto,
      },
    });
  }

  async findAll(page: number) {
    if (page == 0) {
      return this.prisma.formation.findMany({
        include: {id_institution: true, id_user: true}
      });
    } else if (page == 1) {
      return this.prisma.formation.findMany({
        include: {id_institution: true, id_user: true}
        ,take: 20,
      });
    } else {
      return this.prisma.formation.findMany({
        include: {id_institution: true, id_user: true}
        ,
        take: 20,
        skip: (page - 1) * 20,
      });
    }
  }

  async findOne(id_formation: number) {
    const formationExists = await this.prisma.formation.findFirst({
      where: {
        id_formation: id_formation,
      },
    });

    if (!formationExists) {
      throw new NotFoundException('Formação não existente');
    }

    return formationExists;
  }

  async update(id: number, updateFormationDto: UpdateFormationDto) {
    const idInUse = await this.prisma.formation.findUnique({
      where: {
        id_formation: id,
      },
    });

    if (!idInUse) {
      throw new ConflictException('Formação não existente');
    }

    return await this.prisma.formation.update({
      data: {
        ...updateFormationDto,
      },
      where: {
        id_formation: id,
      },
    });
  }

  async remove(id: number) {
    const formationExists = await this.prisma.formation.findUnique({
      where: {
        id_formation: id,
      },
    });

    if (!formationExists) {
      throw new NotFoundException('Formação não existente');
    }

    return await this.prisma.formation.delete({
      where: {
        id_formation: id,
      },
    });
  }
}

//.
