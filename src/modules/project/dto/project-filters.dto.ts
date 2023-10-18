import { IsString } from "class-validator";

export class ProjectFiltersDto {
  @IsString()
  value: string;

  @IsString()
  type: string;
}