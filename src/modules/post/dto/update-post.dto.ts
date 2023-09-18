import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsString, IsOptional } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({ type: String, description: 'Likes da postagem' })
  @IsString()
  @IsOptional()
  likedBy: User['id_user'];
}
