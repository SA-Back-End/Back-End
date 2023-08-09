import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
    @ApiProperty({ type: Number, description: 'ID da postagem', required: false })
    @IsOptional()
    @IsNumber()
    id: number;

    @ApiProperty({ type: String, description: 'ID da postagem' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ type: String, description: 'ID da postagem' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ type: [String], description: 'Tags da postagem' })
    @IsString()
    @IsNotEmpty()
    tag: [string];

    @IsNumber()
    @IsNotEmpty()
    userId: number;
    //verificar  se userId pode ser um arquivo json 'users: { 1, 2, 3}'
}
