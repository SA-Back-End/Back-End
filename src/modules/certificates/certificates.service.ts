import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class CertificatesService {
  constructor(private prisma: PrismaService) { }

  async create(createCertificateDto: CreateCertificateDto) {
    return this.prisma.certificates.create({
      data: {
        ...createCertificateDto
      }
    });
  }

  findAll(page: number) {
    if (page == 0) {
      return this.prisma.certificates.findMany({
        include: {id_institution: true, userId: true}
      });
    } else if (page == 1) {
      return this.prisma.certificates.findMany({
        include: {id_institution: true, userId: true}
        ,take: 20,
      });
    } else {
      return this.prisma.certificates.findMany({
        include: {id_institution: true, userId: true}
        ,
        take: 20,
        skip: (page - 1) * 20,
      });
    }
  }

  async findOne(id: number) {
    const certificatesExists = await this.prisma.certificates.findFirst({
      where: {
        id_certificate: id
      }
    })

    if (!certificatesExists) {
      throw new NotFoundException('Certificado não existe')
    }

    return certificatesExists;
  }

  async update(id_certificate: number, UpdateCertificateDto: UpdateCertificateDto) {
    const idInUse = await this.prisma.certificates.findUnique({
      where: {
        id_certificate: id_certificate,
      }
    })

    if (!idInUse) {
      throw new ConflictException('This certificate does not exist')
    }

    return await this.prisma.certificates.update({
      data: {
        ...UpdateCertificateDto,
      },
      where: {
        id_certificate: id_certificate,
      }
    })
  }

  async remove(id_certificate: number) {
    const certificatesExists = await this.prisma.certificates.findFirst({
      where: {
        id_certificate : id_certificate
      }
    })

    if (!certificatesExists) {
      throw new NotFoundException('Certificado não existe')
    }

    return await this.prisma.certificates.delete({
      where: {
        id_certificate : id_certificate
      }
    })
  }
}
