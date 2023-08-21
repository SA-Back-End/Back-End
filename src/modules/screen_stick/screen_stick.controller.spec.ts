import { Test, TestingModule } from '@nestjs/testing';
import { ScreenStickController } from './screen_stick.controller';
import { ScreenStickService } from './screen_stick.service';

describe('ScreenStickController', () => {
  let controller: ScreenStickController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScreenStickController],
      providers: [ScreenStickService],
    }).compile();

    controller = module.get<ScreenStickController>(ScreenStickController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
