import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInstitutionDto {

  @ApiProperty({ type: String, description: 'Nome da Instituição' })
  @IsString()
  @IsNotEmpty()
  institution_name: string;

  @ApiProperty({ type: String, description: 'Tipo da Instituição' })
  @IsString()
  @IsNotEmpty()
  institutions_type: string;
}
