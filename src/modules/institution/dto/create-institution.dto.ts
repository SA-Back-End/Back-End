import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator/types/decorator/decorators";

export class CreateInstitutionDto {
    @ApiProperty({ type: Number, description: 'ID da Instituição', required: false})
    @IsOptional()
    @IsNumber()
    id_institution: number;

    @ApiProperty({type: String, description: 'Nome da Instituição'})
    @IsString()
    @IsNotEmpty()
    institution_name: string; 

    @ApiProperty({type: String, description: 'Tipo da Instituição'})
    @IsString()
    @IsNotEmpty()
    institutions_type: string;

    @ApiProperty({type: String, description:'Descrição da Instituição'})
    @IsString()
    @IsNotEmpty()
    description: string; 
}
