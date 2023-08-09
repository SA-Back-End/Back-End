import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    tag: string[];

    @IsNumber()
    @IsNotEmpty()
    userId: number;
    //verificar  se userId pode ser um arquivo json 'users: { 1, 2, 3}'
}
