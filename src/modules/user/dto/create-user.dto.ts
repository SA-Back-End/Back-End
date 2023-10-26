import { ApiProperty } from '@nestjs/swagger';
import { StatusUser } from '@prisma/client';
import { State } from '@prisma/client';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsEmail,
  IsJSON,
  ValidateNested,
  IsDate,
  IsDateString,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Nome do usuário',
    example: 'João',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Status do usuário',
    example: 'Disponivel',
  })
  @IsString()
  @IsNotEmpty()
  status: StatusUser;

  @ApiProperty({
    type: Date,
    description: 'Data de Aniversário do usuário',
    example: '2003-09-21T18:19:31.966Z',
  })
  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;

  @ApiProperty({
    type: String,
    description: 'Sobrenome do usuário',
    example: 'Vitor',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'Username do usuário',
    example: 'JoaoVitor',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    description: 'Descrição do usuário',
    example: 'Lorem ipsun, lorem lorem',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: String,
    description: 'E-mail do usuário',
    example: 'joaovitor@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Senha do usuário',
    example: 'senhaQ!1dojoao',
  })
  // @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: Boolean,
    description: 'Nível de acesso do usuário',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;

  @ApiProperty({
    type: String,
    description: 'Estado do usuário',
    example: 'SC',
  })
  @IsString()
  @IsOptional()
  state: State;

  @ApiProperty({
    type: String,
    description: 'URL de algum contato',
    example: 'https://br.linkedin.com/in/joaozin',
  })
  @IsUrl()
  @IsOptional()
  contact_url: string;

  @ApiProperty({
    type: String,
    description: 'Foto de perfil do usuário',
    example:
      'https://as1.ftcdn.net/v2/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg',
  })
  @IsOptional()
  @IsString()
  profilePictureUrl: string;
}
