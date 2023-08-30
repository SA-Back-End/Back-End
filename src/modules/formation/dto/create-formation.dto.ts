import { ApiProperty } from '@nestjs/swagger';
import { StudyArea, User} from '@prisma/client';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFormationDto {

    @ApiProperty({ type: String, description: 'Grau de formação', example: 'Master-ku' })
    @IsString()
    @IsNotEmpty()
    degree: string;

    @ApiProperty({ type: [String], description: 'Área de estudo', example:["Psicologia"]})
    @IsArray()
    @IsNotEmpty()
    studyArea: StudyArea[]

    @ApiProperty({ type: Date, description: 'Data de início', example: '2131-03-12T12:34:23.567' })
    @IsDate()
    @IsNotEmpty()
    beginDate: Date;

    @ApiProperty({ type: Date, description: 'Data de término', example: '2132-04-24T8:20:59.235Z' })
    @IsDate()
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({ type: String, description: 'Descrição', example: 'Lorem ipsun vermelho amarelo azul e sangue roxo!' })
    @IsString()
    @IsNotEmpty()
    descripition: string;

    @ApiProperty({ type: Number, description: 'ID de usuário', example: 12685 })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ type: Number, description: 'ID de usuário', example: 12 })
    @IsNotEmpty()
    id_user: User;
}
 
//.
