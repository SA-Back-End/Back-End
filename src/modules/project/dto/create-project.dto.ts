import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
    @ApiProperty({ type: Number, description: 'ID do projeto', required: false  })
    @IsOptional()
    @IsNumber()
    id: number;

    @ApiProperty({ type: String, description: 'Título do projeto' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ type: String, description: 'Descrição do projeto' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ type: [String], description: 'Tags do projeto' })
    @IsString()
    @IsNotEmpty()
    tag: string[];

    // @IsString()
    // projectUsers: string[]; //?
}
