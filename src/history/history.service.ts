import { Injectable, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { HistoryRecord } from './history-record.interface'; // Define the HistoryRecord interface

@Injectable()
export class HistoryService {
  private history: HistoryRecord[] = [];

  async storeHistory(articleId: number, userId: string): Promise<void> {
    const historyRecord: HistoryRecord = {
      uuid: uuidv4(),
      articleId,
      userId,
      time: new Date(),
    };

    this.history.push(historyRecord);
  }

  async getHistory(): Promise<HistoryRecord[]> {
    return this.history;
  }

  // Optionally, add a method to clear history
  async clearHistory(): Promise<void> {
    this.history = [];
  }
}
