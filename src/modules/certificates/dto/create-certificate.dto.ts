import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateCertificateDto {
  @ApiProperty({
    type: Number,
    description: 'Id do certificado',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  id_certificate: number;

  @ApiProperty({ type: String, description: 'Nome do certificado' })
  @IsString()
  @IsNotEmpty()
  certificate_name: string;

  @ApiProperty({ type: Date, description: 'Data de inicio' })
  @IsDateString()
  @IsNotEmpty()
  beginDate: Date;

  @ApiProperty({ type: Date, description: 'Data de conclusão' })
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({ type: String, description: 'Url do certificado' })
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ type: Number, description: 'Id do usuário' })
  @IsNumber()
  @IsNotEmpty()
  id_user: number;

  @ApiProperty({ type: Number, description: 'Id da Instituição' })
  @IsNumber()
  @IsNotEmpty()
  institutionId: number;
}
