import { ApiProperty } from '@nestjs/swagger';
import { StatusProject, StudyArea } from '@prisma/client';
//import { HardSkills } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
    @ApiProperty({type: Number, description: 'ID do usuário dono do projeto', example: 1234})
    @IsNumber()
    @IsNotEmpty()
    id_projectManager: number;

    @ApiProperty({ type: String, description: 'Status do projeto', example: "Cancelado" })
    @IsNotEmpty()
    status: StatusProject;

    @ApiProperty({ type: [String], description: 'Areas pesquisadas pelo projeto', example: ["Medicina"]  })
    @IsArray()
    @IsNotEmpty()
    studyArea: StudyArea[];

    @ApiProperty({ type: String, description: 'Título do projeto', example: 'Projetinho Verão' })
    @IsString()
    @IsNotEmpty()
    project_name: string;

    @ApiProperty({ type: String, description: 'Descrição do projeto', example: 'Lorem ipsum do projetinho verão' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({type: String, description: 'Link para doações', example: 'https://clonacartao2.0.com.br'})
    @IsString()
    @IsNotEmpty()
    donate: string;
}
