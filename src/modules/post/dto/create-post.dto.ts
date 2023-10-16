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
    description: 'Imagem da postagem',
    example: [
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fbr%2Fimages%2Faccount-avatar-user-login-or-member-outline-user-authorization-profile-icon-avatar-icon-user-icon-user-profile-icon-or-account-icon-vector%2F259394679&psig=AOvVaw35n9E1RsT7jWk8EKxKKNyk&ust=1697564732162000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCOjZysiP-4EDFQAAAAAdAAAAABAD',
    ],
  })
  @IsArray()
  @IsNotEmpty()
  post_img_url: string[];
}
