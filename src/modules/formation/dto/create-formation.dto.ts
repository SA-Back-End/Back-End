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
  @ApiProperty({ type: String, description: 'Grau de formação' })
  @IsString()
  @IsNotEmpty()
  degree: string;

  @ApiProperty({ type: [String], description: 'Área de estudo' })
  @IsArray()
  @IsNotEmpty()
  studyArea: StudyArea[];

  @ApiProperty({ type: Date, description: 'Data de início' })
  @IsDateString()
  @IsNotEmpty()
  beginDate: Date;

  @ApiProperty({ type: Date, description: 'Data de término' })
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({ type: String, description: 'Descrição' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: Number, description: 'ID de usuário' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ type: Number, description: 'ID da Instituição' })
  @IsNumber()
  @IsNotEmpty()
  institutionId: number;
}
