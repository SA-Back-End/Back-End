import { Module } from '@nestjs/common';
import { FormationService } from './formation.service';
import { FormationController } from './formation.controller';

@Module({
  controllers: [FormationController],
  providers: [FormationService],
})
export class FormationModule {}
