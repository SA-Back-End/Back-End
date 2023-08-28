import { ApiProperty } from '@nestjs/swagger';
import { StatusUser } from '@prisma/client';
import { State } from '@prisma/client';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, IsEmail, IsJSON, ValidateNested, IsDate, IsDateString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ type: String, description: 'Nome do usuário'})
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ type: String, description: 'Status do usuário'})
    @IsString()
    @IsNotEmpty()
    status: StatusUser

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

    @ApiProperty({ type: String, description: 'Descrição do usuário' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ type: String, description: 'E-mail do usuário' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ type: String, description: 'Senha do usuário' })
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ type: Boolean, description: 'Nível de acesso do usuário' })
    @IsBoolean()
    @IsOptional()
    isAdmin: boolean;

    @ApiProperty({ type: String, description: 'Estado do usuário' })
    @IsString()
    @IsOptional()
    state: State;

    @ApiProperty({ type: String ,format:'byte', description: 'Foto de perfil do usuário' })
    @IsOptional()
    @IsString()
    profilePicture: Buffer
}