import { Module } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [CertificatesController],
  providers: [CertificatesService, PrismaService],
})
export class CertificatesModule {}
