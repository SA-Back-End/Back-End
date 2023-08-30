import { ApiProperty } from '@nestjs/swagger';
import { StudyArea } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDateString, IsArray} from 'class-validator';

export class CreateExperienceDto {

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({ type: Number, description: 'Id usuário', required: true  })
  userId: number;
	
	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({ type: Number, description: 'Id instituição', required: true  })
  institutionId: number 

	@IsNotEmpty()
	@IsArray()
	@ApiProperty({ type: [String], description: 'A área de estudo da experiência', required: true  })
  studyArea: StudyArea[]

	@IsNotEmpty()
	@IsString()
	@ApiProperty({ type: String, description: 'O cargo exercido da experiência', required: true  })
  role: string;          
	
  	@IsDateString()
	@IsOptional()
	@ApiProperty({ type: Date, description: 'Data de começo na experiência', required: false  })
  beginDate?: Date;
  
	@IsNotEmpty()
	@IsDateString()
	@ApiProperty({ type: Date, description: 'Data de fim na experiência', required: true  })
  endDate: Date;       
	
	@IsOptional()
	@IsString()
	@ApiProperty({ type: String, description: 'Descreva o que você executou em sua experiência', required: false  })
  description: string;   
  
}
