import { Test, TestingModule } from '@nestjs/testing';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { HistoryRecord } from './history-record.interface';

describe('HistoryController', () => {
  let historyController: HistoryController;
  let historyService: HistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryController],
      providers: [HistoryService],
    }).compile();

    historyController = module.get<HistoryController>(HistoryController);
    historyService = module.get<HistoryService>(HistoryService);
  });

  it('should be defined', () => {
    expect(historyController).toBeDefined();
  });

  describe('getHistory', () => {
    it('should return history data', async () => {
      const historyData: HistoryRecord[] = [
        {
          uuid: '1',
          articleId: 1,
          userId: 'user1',
          time: new Date(),
        },
        // Add more history records as needed
      ];

      jest.spyOn(historyService, 'getHistory').mockResolvedValue(historyData);

      const result = await historyController.getHistory();

      expect(result).toEqual(historyData);
    });

    it('should handle errors by throwing an HttpException', async () => {
      jest.spyOn(historyService, 'getHistory').mockRejectedValue(new Error('Failed to fetch history'));

      try {
        await historyController.getHistory();
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getResponse()).toBe('Failed to fetch history');
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });
});
