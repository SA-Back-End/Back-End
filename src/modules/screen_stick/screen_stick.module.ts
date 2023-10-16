import { Module } from '@nestjs/common';
import { ScreenStickService } from './screen_stick.service';
import { ScreenStickController } from './screen_stick.controller';
import { PrismaService } from 'src/database/PrismaService';
import { JwtUtilsService } from 'src/jwt_utils/jwtUtils.service';

@Module({
  controllers: [ScreenStickController],
  providers: [ScreenStickService, PrismaService, JwtUtilsService],
})
export class ScreenStickModule {}
