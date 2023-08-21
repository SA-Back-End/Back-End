import { ApiProperty } from '@nestjs/swagger';
//import { HardSkills } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class CreatePostDto {
    @ApiProperty({ type: String, description: 'ID da postagem' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ type: String, description: 'ID da postagem' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ type: [String], description: 'Tags da postagem' })
    @IsArray()
    @IsNotEmpty()
    tag: String[];

    @IsNumber()
    @IsNotEmpty()
    userId: number;
    //verificar  se userId pode ser um arquivo json 'users: { 1, 2, 3}'
}
