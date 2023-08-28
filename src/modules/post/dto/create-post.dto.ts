import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
//import { HardSkills } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class CreatePostDto {
    @ApiProperty({ type: Number, description: 'Id do autor da postagem' })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ type: String, description: 'Texto da postagem' })
    @IsString()
    @IsNotEmpty()
    text: string;

    @ApiProperty({ type: String,format:'byte', description: 'Imagem da postagem' })
    @IsString()
    @IsNotEmpty()
    post_img: Buffer;

    @ApiProperty({ type: String, description: 'Likes da postagem' })
    @IsString()
    @IsOptional()
    likedBy: User['id_user']
}
