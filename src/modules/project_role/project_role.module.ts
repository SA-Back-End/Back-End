import { Module } from '@nestjs/common';
import { ProjectRoleService } from './project_role.service';
import { ProjectRoleController } from './project_role.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ProjectRoleController],
  providers: [ProjectRoleService, PrismaService],
})
export class ProjectRoleModule {}
