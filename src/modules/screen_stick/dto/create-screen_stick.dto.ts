import { ApiProperty } from '@nestjs/swagger';
import { StatusProject, StudyArea } from '@prisma/client';
//import { HardSkills } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateScreenStickDto {
    @ApiProperty({type: Number, description: 'ID do usuário que curtiu', example: 558})
    @IsNumber()
    @IsNotEmpty()
    id_user: number;

    @ApiProperty({type: Number, description: 'ID do cargo curtido', example: 486})
    @IsNumber()
    @IsNotEmpty()
    id_role: number;

    @ApiProperty({type: Date, description: 'Data da curtida', example: '2001-03-27T12:12:23.010Z'})
    @IsDateString()
    @IsNotEmpty()
    match_dateTime: Date;
}
