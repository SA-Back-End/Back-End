import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, IsEmail, IsJSON, ValidateNested } from 'class-validator';

export class Photo {
    height: number
    width: number
    url: string
}

export class CreateUserDto {
    @ApiProperty({ type: String, description: 'Nome do usuário' })
    @IsString()
    @IsNotEmpty()
    firstName: string;

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

    @ApiProperty({ type: JSON, description: 'Foto de perfil do usuário' })
    @IsOptional()
    @IsJSON()
    @ValidateNested()
    @Type(() => Photo)
    profilePicture: Photo
}