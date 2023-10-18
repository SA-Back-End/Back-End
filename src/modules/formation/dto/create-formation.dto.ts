import { ApiProperty } from '@nestjs/swagger';
import { StudyArea, User } from '@prisma/client';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFormationDto {
  @ApiProperty({
    type: String,
    description: 'Grau de formação',
    example: 'Mestrado',
  })
  @IsString()
  @IsNotEmpty()
  degree: string;

  @ApiProperty({
    type: [String],
    description: 'Área de estudo',
    example: ['Ciencias_Exatas_e_da_Terra'],
  })
  @IsArray()
  @IsNotEmpty()
  studyArea: StudyArea[];

  @ApiProperty({
    type: Date,
    description: 'Data de início',
    example: '2001-01-01T18:18:18.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  beginDate: Date;

  @ApiProperty({
    type: Date,
    description: 'Data de término',
    example: '2000-01-01T18:18:18.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({
    type: String,
    description: 'Descrição',
    example: 'Lorem ipsun lorem',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: Number, description: 'ID de usuário', example: 90 })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ type: Number, description: 'ID da Instituição', example: 78 })
  @IsNumber()
  @IsNotEmpty()
  institutionId: number;
}
