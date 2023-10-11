import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/PrismaService';
import { JwtUtilsService } from 'src/jwt_utils/jwtUtils.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtUtilsService],
  exports: [UserService],
})
export class UserModule {}
