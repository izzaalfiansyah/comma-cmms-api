import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from './data-source';

describe('DataSource', () => {
  let provider: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSource],
    }).compile();

    provider = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
