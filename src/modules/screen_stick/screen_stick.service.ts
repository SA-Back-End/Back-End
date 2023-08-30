import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateScreenStickDto } from './dto/create-screen_stick.dto';
import { UpdateScreenStickDto } from './dto/update-screen_stick.dto';

@Injectable()
export class ScreenStickService {
  constructor(private prisma: PrismaService) { }

  async create(createScreenStickDto: CreateScreenStickDto) {
    return this.prisma.screen_Curtidas.create({
      data: {
        ...createScreenStickDto
      }
    })
  }

  async findAll(page: number) {
    if (page == 0) {
      return this.prisma.screen_Curtidas.findMany({
        include:{user:true,project_role:true},
      });
    } else if (page == 1) {
      return this.prisma.screen_Curtidas.findMany({
        include:{user:true,project_role:true},
        take: 20,
      });
    } else {
      return this.prisma.screen_Curtidas.findMany({
        include:{user:true,project_role:true},
        take: 20,
        skip: (page - 1) * 20,
      });
    }
  }

  async findOne(id_stick: number) {
    const stickExists = await this.prisma.screen_Curtidas.findFirst({
      where: {
        id_stick: id_stick
      }
    })

    if (!stickExists) {
      throw new NotFoundException('Stick não existe')
    }

    return stickExists;
  }

  async update(id_stick: number, updateScreenStickDto: UpdateScreenStickDto) {
    const idInUse = await this.prisma.screen_Curtidas.findUnique({
      where: {
        id_stick: id_stick,
      }
    })

    if (!idInUse) {
      throw new ConflictException('This screen_curtida does not exist')
    }

    return await this.prisma.screen_Curtidas.update({
      data: {
        ...updateScreenStickDto,
      },
      where: {
        id_stick: id_stick,
      }
    })
  }

  async remove(id_stick: number) {
    const screenCurtidaExists = await this.prisma.screen_Curtidas.findUnique({
      where: {
        id_stick: id_stick,
      }
    })

    if (!screenCurtidaExists) {
      throw new NotFoundException('Curtida não existe')
    }

    return await this.prisma.screen_Curtidas.delete({
      where: {
        id_stick: id_stick,
      }
    })
  }
}
