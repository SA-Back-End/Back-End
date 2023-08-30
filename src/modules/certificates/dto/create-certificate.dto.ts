import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateCertificateDto {
    @ApiProperty({ type: Number, description: 'Id do certificado', required: false, example: 13562 })
    @IsOptional()
    @IsNumber()
    id_certificate: number;

    @ApiProperty({ type: String, description: 'Nome do certificado', example: 'Advogado de causas perdidas' })
    @IsString()
    @IsNotEmpty()
    certificate_name: string;

    @ApiProperty({ type: Date, description: 'Data de inicio', example: '2020-03-29T12:39:10.892Z' })
    @IsDateString()
    @IsNotEmpty()
    beginDate: Date;

    @ApiProperty({ type: Date, description: 'Data de conclusão', example: '2020-12-04T16:20:00:420Z' })
    @IsDateString()
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({ type: String, description: 'Url do certificado', example: 'https://www.clonacartao.com.br' })
    @IsUrl()
    @IsNotEmpty()
    url: string;

    @ApiProperty({ type: Number, description: 'Id do usuário', example: 6996 })
    @IsNumber()
    @IsNotEmpty()
    id_user: number;

    @ApiProperty({ type: String, description: 'Id do usuário', example: '1215' })
    @IsString()
    @IsNotEmpty()
    userId: User;
}










