import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { HistoryService } from './history/history.service';
import { HistoryController } from './history/history.controller';

@Module({
  imports: [ConfigModule.forRoot(), ArticleModule],
  controllers: [AppController, HistoryController],
  providers: [AppService, HistoryService],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/articles', method: RequestMethod.GET },
        { path: '/articles/:id', method: RequestMethod.GET },
      );
  }
}
