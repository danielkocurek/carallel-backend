import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { HistoryService } from '../history/history.service';

@Module({
  providers: [ArticleService, HistoryService],
  controllers: [ArticleController]
})
export class ArticleModule {}
