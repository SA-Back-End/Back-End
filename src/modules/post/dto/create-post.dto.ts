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
    type: String,
    description: 'Texto da postagem',
    example: 'lorem ipsun ipsun lorem',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    type: [String],
    description: 'Imagem da postagem',
    example: [
      'https://as1.ftcdn.net/v2/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg',
    ],
  })
  @IsArray()
  @IsNotEmpty()
  post_img_url: string[];
}
