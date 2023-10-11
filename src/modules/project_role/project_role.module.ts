import { Module } from '@nestjs/common';
import { ProjectRoleService } from './project_role.service';
import { ProjectRoleController } from './project_role.controller';
import { PrismaService } from 'src/database/PrismaService';
import { JwtUtilsService } from 'src/jwt_utils/jwtUtils.service';

@Module({
  controllers: [ProjectRoleController],
  providers: [ProjectRoleService, PrismaService, JwtUtilsService],
})
export class ProjectRoleModule {}
