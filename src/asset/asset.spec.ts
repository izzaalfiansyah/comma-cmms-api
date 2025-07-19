import { Test, TestingModule } from '@nestjs/testing';
import { Asset } from './asset';

describe('Asset', () => {
  let provider: Asset;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Asset],
    }).compile();

    provider = module.get<Asset>(Asset);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
