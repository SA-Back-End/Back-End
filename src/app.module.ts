import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { ProjectModule } from './modules/project/project.module';
import { PrismaService } from './database/PrismaService';
import { AuthModule } from './auth/auth.module';
import { FormationModule } from './modules/formation/formation.module';
import { InstitutionModule } from './modules/institution/institution.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { CertificatesModule } from './modules/certificates/certificates.module';
import { ScreenStickModule } from './modules/screen_stick/screen_stick.module';
import { ProjectRoleModule } from './project_role/project_role.module';
import { ParticipationModule } from './participation/participation.module';

@Module({
  imports: [UserModule, PostModule, ProjectModule, AuthModule, FormationModule, InstitutionModule, ExperienceModule, CertificatesModule, ScreenStickModule, ProjectRoleModule, ParticipationModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
