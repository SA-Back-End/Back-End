import { Injectable, NotFoundException } from '@nestjs/common';
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
      });
    } else if (page == 1) {
      return this.prisma.certificates.findMany({
        take: 20,
      });
    } else {
      return this.prisma.certificates.findMany({
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

  update(id: number, updateCertificateDto: UpdateCertificateDto) {
    return `This action updates a #${id} certificate`;
  }

  async remove(certificate_name: string) {
    const certificateExists = await this.prisma.certificates.findFirst({
      where: {
        certificate_name
      }
    })

    if (!certificateExists) {
      throw new NotFoundException('Certificado não existe')
    }

    return await this.prisma.certificates.delete({
      where: {
        certificate_name
      }
    })
  }
}
