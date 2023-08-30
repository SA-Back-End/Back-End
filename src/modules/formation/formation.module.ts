import { Module } from '@nestjs/common';
import { FormationService } from './formation.service';
import { FormationController } from './formation.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [FormationController],
  providers: [FormationService, PrismaService],
})
export class FormationModule {}
