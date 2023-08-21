import { Injectable } from '@nestjs/common';
import { CreateScreenStickDto } from './dto/create-screen_stick.dto';
import { UpdateScreenStickDto } from './dto/update-screen_stick.dto';

@Injectable()
export class ScreenStickService {
  create(createScreenStickDto: CreateScreenStickDto) {
    return 'This action adds a new screenStick';
  }

  findAll() {
    return `This action returns all screenStick`;
  }

  findOne(id: number) {
    return `This action returns a #${id} screenStick`;
  }

  update(id: number, updateScreenStickDto: UpdateScreenStickDto) {
    return `This action updates a #${id} screenStick`;
  }

  remove(id: number) {
    return `This action removes a #${id} screenStick`;
  }
}
