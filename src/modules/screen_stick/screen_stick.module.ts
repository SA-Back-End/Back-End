import { Module } from '@nestjs/common';
import { ScreenStickService } from './screen_stick.service';
import { ScreenStickController } from './screen_stick.controller';

@Module({
  controllers: [ScreenStickController],
  providers: [ScreenStickService],
})
export class ScreenStickModule {}
