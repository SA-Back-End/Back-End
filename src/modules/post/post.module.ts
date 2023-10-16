import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/database/PrismaService';
import { JwtUtilsService } from 'src/jwt_utils/jwtUtils.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, JwtUtilsService],
})
export class PostModule {}
