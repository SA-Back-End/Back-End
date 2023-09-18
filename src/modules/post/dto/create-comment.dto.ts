import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    type: Number,
    description: 'Id do autor do comentário',
    example: 45,
  })
  @IsNumber()
  @IsNotEmpty()
  idUser: number;

  @ApiProperty({
    type: String,
    description: 'Texto do comentário',
    example: 'lorem ipsun ipsun lorem',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
