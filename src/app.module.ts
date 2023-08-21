import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { ProjectModule } from './modules/project/project.module';
import { PrismaService } from './database/PrismaService';
import { AuthModule } from './auth/auth.module';
import { FormationModule } from './formation/formation.module';
import { InstitutionModule } from './institution/institution.module';
import { ExperienceModule } from './experience/experience.module';
import { CertificatesModule } from './certificates/certificates.module';
import { ScreenStickModule } from './screen_stick/screen_stick.module';

@Module({
  imports: [UserModule, PostModule, ProjectModule, AuthModule, FormationModule, InstitutionModule, ExperienceModule, CertificatesModule, ScreenStickModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
