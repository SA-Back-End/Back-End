import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateScreenStickDto } from './dto/create-screen_stick.dto';
import { UpdateScreenStickDto } from './dto/update-screen_stick.dto';

@Injectable()
export class ScreenStickService {
  constructor(private prisma: PrismaService) { }

  async create(createProjectDto: CreateScreenStickDto) {
    return this.prisma.project.create({
      data: {
        id_user: createProjectDto.id_user,
        id_role: createProjectDto.id_role,
        match_dateTime: createProjectDto.match_dateTime,
      }
    })
  }

  async findAll(page: number) {
    if (page == 0) {
      return this.prisma.project.findMany({
      });
    } else if (page == 1) {
      return this.prisma.project.findMany({
        take: 20,
      });
    } else {
      return this.prisma.project.findMany({
        take: 20,
        skip: (page - 1) * 20,
      });
    }
  }

  //TUDO ERRADO
  async findOne(id_stick: number) {
    const stickExists = await this.prisma.project.findFirst({
      where: {
        id_stick: id_stick
      }
    })

    if (!stickExists) {
      throw new NotFoundException('Stick não existe')
    }

    return stickExists;
  }

  async update(id_stick: number, pdateScreenStickDto: UpdateScreenStickDto) {
    const idInUse = await this.prisma.project.findUnique({
      where: {
        id_stick: id_stick,
      }
    })
  }

/*
=====COISAS A ADICIONAR======
$ resto do update
$ remove
$ arrumar create
$ arrumar findOne

*/
}
