import { ApiProperty } from '@nestjs/swagger';
import { HardSkills } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
    @ApiProperty({ type: Number, description: 'ID do projeto', required: false  })
    @IsOptional()
    @IsNumber()
    id: number;

    @ApiProperty({ type: String, description: 'Título do projeto' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ type: String, description: 'Descrição do projeto' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ type: [String], description: 'Tags do projeto' })
    @IsArray()
    @IsNotEmpty()
    tags: HardSkills[];

    // @IsString()
    // projectUsers: string[]; //?
}
