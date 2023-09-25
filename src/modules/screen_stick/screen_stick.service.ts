import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateScreenStickDto } from './dto/create-screen_stick.dto';
import { UpdateScreenStickDto } from './dto/update-screen_stick.dto';

@Injectable()
export class ScreenStickService {
  constructor(private prisma: PrismaService) { }

  async create(createScreenStickDto: CreateScreenStickDto,idRequisitionMaker:number) {
    const candidateExists= await this.prisma.user.findFirst({where:{id_user:createScreenStickDto.id_candidate}})
     if(!candidateExists) {
      throw new NotFoundException('Usuário não existente');}

    const roleExists= await this.prisma.project_role.findFirst({where:{id_role:createScreenStickDto.id_role}})
    if (!roleExists) {
      throw new NotFoundException('Cargo não existente');
    } 

    const requisitionMakerExists= await this.prisma.user.findFirst({where:{id_user:idRequisitionMaker}})
    if(!requisitionMakerExists){
      throw new ConflictException('Dono da Requisição não existente')
    }

    const likeCandidateExists=await this.prisma.screen_Curtidas.findFirst({
      where:{...createScreenStickDto, likeAuthor:'Candidate'}
    })
    const likeOwnerExists=await this.prisma.screen_Curtidas.findFirst({
      where:{...createScreenStickDto, likeAuthor:'Owner'}
    })

    const projectOwner= await this.prisma.project_role.findFirst({
      where:{id_role:createScreenStickDto.id_role ,project:{id_projectManager: idRequisitionMaker}}
    })

    if(projectOwner && !likeOwnerExists){
      return this.prisma.screen_Curtidas.create({
        data: {
          ...createScreenStickDto,
          likeAuthor: 'Owner'
        }
      })
    }
    else if(!projectOwner && !likeCandidateExists){
      return this.prisma.screen_Curtidas.create({
        data: {
          ...createScreenStickDto,
          likeAuthor: 'Candidate'
        }
      })
    }
    else{
      throw new ConflictException('Like já tinha sido criado')
    }

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
      throw new NotFoundException('Stick não existente')
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
      throw new ConflictException('Like não existente')
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
      throw new NotFoundException('Curtida não existente')
    }

    return await this.prisma.screen_Curtidas.delete({
      where: {
        id_stick: id_stick,
      }
    })
  }
}
