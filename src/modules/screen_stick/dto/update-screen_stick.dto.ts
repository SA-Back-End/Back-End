import { PartialType } from '@nestjs/swagger';
import { CreateScreenStickDto } from './create-screen_stick.dto';

export class UpdateScreenStickDto extends PartialType(CreateScreenStickDto) {}
