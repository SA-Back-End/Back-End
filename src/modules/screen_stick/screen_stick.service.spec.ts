import { Test, TestingModule } from '@nestjs/testing';
import { ScreenStickService } from './screen_stick.service';

describe('ScreenStickService', () => {
  let service: ScreenStickService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreenStickService],
    }).compile();

    service = module.get<ScreenStickService>(ScreenStickService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
