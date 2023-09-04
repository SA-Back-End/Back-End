import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { HardSkills, SoftSkills, StatusUser, StudyArea } from '@prisma/client';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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
    studyArea?: StudyArea[]

    @ApiProperty({ type: String, description: 'Status do usuário'})
    @IsString()
    @IsNotEmpty()
    status: StatusUser

    @ApiProperty({ type: String, description: 'Descrição do usuário' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ type: Boolean, description: 'Nível de acesso do usuário' })
    @IsBoolean()
    @IsOptional()
    isAdmin: boolean;

    @ApiProperty({ type: String ,format:'byte', description: 'Foto de perfil do usuário' })
    @IsOptional()
    @IsString()
    profilePicture: Buffer
}
