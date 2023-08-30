import { ApiProperty } from '@nestjs/swagger';
import { StatusUser } from '@prisma/client';
import { State } from '@prisma/client';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, IsEmail, IsJSON, ValidateNested, IsDate, IsDateString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ type: String, description: 'Nome do usuário', example: 'José de Alencar'})
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ type: String, description: 'Status do usuário', example: 'Disponivel'})
    @IsString()
    @IsNotEmpty()
    status: StatusUser

    @ApiProperty({ type: Date, description: 'Data de Aniversário do usuário', example: '1983-09-03T22:22:02.000Z'})
    @IsNotEmpty()
    @IsDateString()
    birthDate: Date

    @ApiProperty({ type: String, description: 'Sobrenome do usuário', example: 'Dirton' })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ type: String, description: 'Username do usuário', example: 'Josezinho' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ type: String, description: 'Descrição do usuário', example:'Homem, casado, solteiro e endividado' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ type: String, description: 'E-mail do usuário', example: 'Josezinho@gmail.com'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ type: String, description: 'Senha do usuário', example: 'NomeDaMinhaEx:(' })
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ type: Boolean, description: 'Nível de acesso do usuário', example: true })
    @IsBoolean()
    @IsOptional()
    isAdmin: boolean;

    @ApiProperty({ type: String, description: 'Estado do usuário', example: 'Rio Gande do Sul' })
    @IsString()
    @IsOptional()
    state: State;

    @ApiProperty({ type: String ,format:'byte', description: 'Foto de perfil do usuário', example: 'ghcgcgh' })
    @IsOptional()
    @IsString()
    profilePicture: Buffer
}