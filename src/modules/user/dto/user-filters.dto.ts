import { IsString } from 'class-validator';

export class UserFiltersDto {
  @IsString()
  value: string;

  @IsString()
  type: string;
}
