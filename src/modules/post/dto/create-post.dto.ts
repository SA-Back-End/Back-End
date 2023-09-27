import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
//import { HardSkills } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    type: Number,
    description: 'Id do autor da postagem',
    example: 45,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    type: String,
    description: 'Texto da postagem',
    example: 'lorem ipsun ipsun lorem',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    type: [String],
    format: 'byte',
    description: 'Imagem da postagem',
    example: ['U3dhZ2dlciByb2Nrcw=='],
  })
  @IsArray()
  @IsNotEmpty()
  post_img: Buffer[];
}
