import { ApiProperty } from '@nestjs/swagger';
import { StatusProject, StudyArea, WorkType } from '@prisma/client';
//import { HardSkills } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    type: Number,
    description: 'ID do usuário dono do projeto',
    example: 33,
  })
  @IsNumber()
  @IsNotEmpty()
  id_projectManager: number;

  @ApiProperty({
    type: String,
    description: 'Status do projeto',
    example: 'Cancelado',
  })
  @IsNotEmpty()
  status: StatusProject;

  @ApiProperty({
    type: [String],
    description: 'Areas pesquisadas pelo projeto',
    example: ['Ciencias_Exatas_e_da_Terra'],
  })
  @IsArray()
  @IsNotEmpty()
  studyArea: StudyArea[];

  @ApiProperty({
    type: String,
    description: 'Título do projeto',
    example: 'Titulo',
  })
  @IsString()
  @IsNotEmpty()
  project_name: string;

  @ApiProperty({
    type: String,
    description: 'Descrição do projeto',
    example: 'Lorem ipsum, lorem ipsun, lorem lorem',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: String,
    description: 'Link para doações',
    example: 'https://seila.com',
  })
  @IsString()
  @IsNotEmpty()
  donate: string;

  @ApiProperty({
    type: String,
    description: 'Se o projeto é online, híbrido ou presencial',
    example: 'Presencial',
  })
  @IsNotEmpty()
  workType: WorkType;
}
