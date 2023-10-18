import { ApiProperty } from '@nestjs/swagger';
import { StudyArea } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
  IsArray,
} from 'class-validator';

export class CreateExperienceDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'Id usuário',
    required: true,
    example: 12,
  })
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'Id instituição',
    required: true,
    example: 1,
  })
  institutionId: number;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    type: [String],
    description: 'A área de estudo da experiência',
    required: true,
    example: ['Ciencias_Humanas'],
  })
  studyArea: StudyArea[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'O cargo exercido da experiência',
    required: true,
    example: 'Historiador',
  })
  role: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    type: Date,
    description: 'Data de começo na experiência',
    required: false,
    example: '2015-04-24T08:14:51.219Z',
  })
  beginDate?: Date;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    type: Date,
    description: 'Data de fim na experiência',
    required: true,
    example: '2019-12-16T06:01:12.029Z',
  })
  endDate: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Descreva o que você executou em sua experiência',
    required: false,
    example: 'Historiador do Brasil',
  })
  description: string;
}
