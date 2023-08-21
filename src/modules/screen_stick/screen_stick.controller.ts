import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScreenStickService } from './screen_stick.service';
import { CreateScreenStickDto } from './dto/create-screen_stick.dto';
import { UpdateScreenStickDto } from './dto/update-screen_stick.dto';

@Controller('screen-stick')
export class ScreenStickController {
  constructor(private readonly screenStickService: ScreenStickService) {}

  @Post()
  create(@Body() createScreenStickDto: CreateScreenStickDto) {
    return this.screenStickService.create(createScreenStickDto);
  }

  @Get()
  findAll() {
    return this.screenStickService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.screenStickService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScreenStickDto: UpdateScreenStickDto) {
    return this.screenStickService.update(+id, updateScreenStickDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.screenStickService.remove(+id);
  }
}
