import { Test, TestingModule } from '@nestjs/testing';
import { HistoryService } from './history.service';

describe('HistoryService', () => {
  let historyService: HistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryService],
    }).compile();

    historyService = module.get<HistoryService>(HistoryService);
  });

  it('should store a history record', async () => {
    const articleId = 123;
    const userId = 'user123';
    await historyService.storeHistory(articleId, userId);

    const history = await historyService.getHistory();
    expect(history.length).toBe(1);
    expect(history[0].articleId).toBe(articleId);
    expect(history[0].userId).toBe(userId);
  });

  it('should clear history', async () => {
    await historyService.storeHistory(123, 'user123');
    await historyService.clearHistory();

    const history = await historyService.getHistory();
    expect(history.length).toBe(0);
  });

  // Add more test cases here for various edge cases, error handling, and validation checks.
});
