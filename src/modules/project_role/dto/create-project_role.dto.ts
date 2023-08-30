import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjectRoleDto {
    @ApiProperty({type: Number, description: 'ID do projeto relacionado ao cargo'})
    @IsNumber()
    @IsNotEmpty()
    id_project: number;

    @ApiProperty({type: String, description: 'Cargo em sí'})
    @IsString()
    @IsNotEmpty()
    user_role: string;
}
