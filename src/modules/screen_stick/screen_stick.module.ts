import { Module } from '@nestjs/common';
import { ScreenStickService } from './screen_stick.service';
import { ScreenStickController } from './screen_stick.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ScreenStickController],
  providers: [ScreenStickService, PrismaService],
})
export class ScreenStickModule {}
