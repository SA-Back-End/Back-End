import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateScreenStickDto {
    @ApiProperty({type: Number, description: 'ID do usuário que curtiu', example: 122})
    @IsNumber()
    @IsNotEmpty()
    id_user: number;

    @ApiProperty({type: Number, description: 'ID do cargo curtido', example: 345})
    @IsNumber()
    @IsNotEmpty()
    id_role: number;

    @ApiProperty({type: Date, description: 'Data da curtida', example: '2000-01-01T18:19:31.966Z'})
    @IsDateString()
    @IsNotEmpty()
    match_dateTime: Date;
}
