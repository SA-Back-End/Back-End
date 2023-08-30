import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateScreenStickDto {
    @ApiProperty({type: Number, description: 'ID do usuário que curtiu'})
    @IsNumber()
    @IsNotEmpty()
    id_user: number;

    @ApiProperty({type: Number, description: 'ID do cargo curtido'})
    @IsNumber()
    @IsNotEmpty()
    id_role: number;

    @ApiProperty({type: Date, description: 'Data da curtida'})
    @IsDateString()
    @IsNotEmpty()
    match_dateTime: Date;
}
