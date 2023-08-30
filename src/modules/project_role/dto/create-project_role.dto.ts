import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjectRoleDto {
    @ApiProperty({type: Number, description: 'ID do projeto relacionado ao cargo', example: 78})
    @IsNumber()
    @IsNotEmpty()
    id_project: number;

    @ApiProperty({type: String, description: 'Cargo em sí', example: 'Maquinista de computador'})
    @IsString()
    @IsNotEmpty()
    user_role: string;
}
