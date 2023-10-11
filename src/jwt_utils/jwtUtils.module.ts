/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtUtilsService } from './jwtUtils.service';

@Module({
  providers: [JwtUtilsService],
  exports: [JwtUtilsService],
})
export class JwtUtilsModule {}
