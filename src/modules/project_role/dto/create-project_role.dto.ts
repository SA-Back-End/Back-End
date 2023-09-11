import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProjectRoleDto {
    @ApiProperty({type: Number, description: 'ID do projeto relacionado ao cargo', example: 34})
    @IsNumber()
    @IsNotEmpty()
    id_project: number;

    @ApiProperty({type: String, description: 'Cargo em sí', example: 'Programador'})
    @IsString()
    @IsNotEmpty()
    user_role: string;
    
    @ApiProperty({type: Boolean, description: 'Disponibilidade do projeto', example: true })
    @IsBoolean()
    @IsNotEmpty()
    isOpen : boolean;
}
