import { ApiProperty } from '@nestjs/swagger';
import { StudyArea, User} from '@prisma/client';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFormationDto {

    @ApiProperty({ type: String, description: 'Grau de formação' })
    @IsString()
    @IsNotEmpty()
    degree: string;

    @ApiProperty({ type: [String], description: 'Área de estudo'})
    @IsArray()
    @IsNotEmpty()
    studyArea: StudyArea[]

    @ApiProperty({ type: Date, description: 'Data de início' })
    @IsDate()
    @IsNotEmpty()
    beginDate: Date;

    @ApiProperty({ type: Date, description: 'Data de término' })
    @IsDate()
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({ type: String, description: 'Descrição' })
    @IsString()
    @IsNotEmpty()
    descripition: string;

    @ApiProperty({ type: Number, description: 'ID de usuário' })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ type: Number, description: 'ID de usuário' })
    @IsNotEmpty()
    id_user: User;
}
 
//.
