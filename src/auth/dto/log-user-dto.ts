import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LogUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Username do usuário'  })
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Senha do usuário'  })
    password: string;
}