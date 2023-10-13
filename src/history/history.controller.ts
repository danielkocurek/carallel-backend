import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) { }

  @Get()
  async getHistory() {  
    try {
      const history = await this.historyService.getHistory();
      return history;
    } catch (error) {
      throw new HttpException('Failed to fetch history', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
