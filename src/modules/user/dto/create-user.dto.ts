import { ApiProperty } from '@nestjs/swagger';
import { StatusUser } from '@prisma/client';
import { State } from '@prisma/client';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, IsEmail, IsJSON, ValidateNested, IsDate, IsDateString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ type: String, description: 'Nome do usuário'})
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ type: Date, description: 'Data de Aniversário do usuário'})
    @IsNotEmpty()
    @IsDateString()
    birthDate: Date

    @ApiProperty({ type: String, description: 'Sobrenome do usuário' })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ type: String, description: 'Username do usuário' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ type: String, description: 'E-mail do usuário' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ type: String, description: 'Senha do usuário' })
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ type: String, description: 'Estado do usuário' })
    @IsString()
    @IsOptional()
    state: State;
}