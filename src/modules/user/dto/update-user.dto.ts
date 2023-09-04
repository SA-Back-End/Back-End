import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { HardSkills, SoftSkills, StudyArea } from '@prisma/client';
import { IsArray, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ type: String, description: 'HardSkills', example: ['Desenvolvimento_web']})
    @IsOptional()
    @IsArray()
    hardSkills?: HardSkills[]

    @ApiProperty({ type: String, description: 'SoftSkills', example: ['Trabalho_em_equipe']})
    @IsOptional()
    @IsArray()
    softSkills?: SoftSkills[]

    @ApiProperty({ type: String, description: 'StudyArea', example: ['Ciencia_da_Computacao']})
    @IsOptional()
    @IsArray()
    studyarea?: StudyArea[]
}
