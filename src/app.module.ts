import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { ProjectModule } from './modules/project/project.module';
import { PrismaService } from './database/PrismaService';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PostModule, ProjectModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
