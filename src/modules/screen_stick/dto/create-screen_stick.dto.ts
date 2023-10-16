import { ApiProperty } from '@nestjs/swagger';
import { LikeAuthor } from '@prisma/client';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateScreenStickDto {
  @ApiProperty({
    type: Number,
    description: 'ID do Candidato ao cargo',
    example: 122,
  })
  @IsNumber()
  @IsNotEmpty()
  id_candidate: number;

  @ApiProperty({
    type: Number,
    description: 'ID do cargo curtido',
    example: 345,
  })
  @IsNumber()
  @IsNotEmpty()
  id_role: number;
}
