import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateCertificateDto {

  @ApiProperty({ type: String, description: 'Nome do certificado', example: 'Advogado de causas perdidas' })
  @IsString()
  @IsNotEmpty()
  certificate_name: string;

  @ApiProperty({ type: Date, description: 'Data de inicio', example: '2003-02-19T12:30:00.743Z' })
  @IsDateString()
  @IsNotEmpty()
  beginDate: Date;

  @ApiProperty({ type: Date, description: 'Data de conclusão', example: '2003-09-21T18:19:31.966Z' })
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({ type: String, description: 'Url do certificado', example: '2' })
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ type: Number, description: 'Id do usuário', example: 12 })
  @IsNumber()
  @IsNotEmpty()
  id_user: number;

  @ApiProperty({ type: Number, description: 'Id da Instituição', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  institutionId: number;
}
