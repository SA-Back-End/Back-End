import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator/types/decorator/decorators";

export class CreateInstitutionDto {
    @ApiProperty({ type: Number, description: 'ID da Instituição', required: false, example: 34546})
    @IsOptional()
    @IsNumber()
    id_institution: number;

    @ApiProperty({type: String, description: 'Nome da Instituição', example: 'Escola do Sexo'})
    @IsString()
    @IsNotEmpty()
    institution_name: string; 

    @ApiProperty({type: String, description: 'Tipo da Instituição', example: 'Escola'})
    @IsString()
    @IsNotEmpty()
    institutions_type: string;

    @ApiProperty({type: String, description:'Descrição da Instituição', example: 'Lorem Ipsun jha naho sei nada'})
    @IsString() 
    @IsNotEmpty()
    description: string; 
}
