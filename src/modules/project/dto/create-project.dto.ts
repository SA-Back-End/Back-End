import { ApiProperty } from '@nestjs/swagger';
import { StatusProject, StudyArea } from '@prisma/client';
//import { HardSkills } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
    @ApiProperty({type: Number, description: 'ID do usuário dono do projeto', required: true})
    @IsNumber()
    @IsNotEmpty()
    id_projectManager: number;

    @ApiProperty({ type: String, description: 'Status do projeto' })
    @IsArray()
    @IsNotEmpty()
    status: StatusProject;

    @ApiProperty({ type: [String], description: 'Areas pesquisadas pelo projeto' })
    @IsArray()
    @IsNotEmpty()
    studyArea: StudyArea[];

    @ApiProperty({ type: String, description: 'Título do projeto' })
    @IsString()
    @IsNotEmpty()
    project_name: string;

    @ApiProperty({ type: String, description: 'Descrição do projeto' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({type: String, description: 'Link para doações'})
    @IsString()
    @IsNotEmpty()
    donate: string;
}
