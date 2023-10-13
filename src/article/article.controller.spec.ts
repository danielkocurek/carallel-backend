import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { HistoryService } from '../history/history.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import articles from './mock-articles-db'; // Import mock articles from mock-articles-db

describe('ArticleController', () => {
  let articleController: ArticleController;
  let articleService: ArticleService;
  let historyService: HistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [ArticleService, HistoryService],
    }).compile();

    articleController = module.get<ArticleController>(ArticleController);
    articleService = module.get<ArticleService>(ArticleService);
    historyService = module.get<HistoryService>(HistoryService);
  });

  it('should be defined', () => {
    expect(articleController).toBeDefined();
  });

  describe('getArticles', () => {
    it('should return a list of articles', async () => {
      jest.spyOn(articleService, 'getArticles').mockResolvedValue(articles);

      expect(await articleController.getArticles()).toBe(articles);
    });

    it('should handle errors and return a 500 status code', async () => {
      jest.spyOn(articleService, 'getArticles').mockRejectedValue(new Error('Test Error'));

      await expect(articleController.getArticles()).rejects.toThrow(HttpException);
    });
  });

  describe('getArticle', () => {
    it('should return an article by ID', async () => {
      const articleId = 1;
      const mockUserId = 'test-user-id';

      jest.spyOn(articleService, 'getArticleById').mockResolvedValue(articles[0]); // Use the first article from the mock data
      jest.spyOn(historyService, 'storeHistory').mockResolvedValue(null);

      expect(await articleController.getArticle(articleId, mockUserId)).toBe(articles[0]); // Assert using the first article

      expect(articleService.getArticleById).toHaveBeenCalledWith(articleId);
      expect(historyService.storeHistory).toHaveBeenCalledWith(articleId, mockUserId);
    });

    it('should handle "Article not found" and return a 404 status code', async () => {
      const articleId = 999; // Using a non-existent article ID
      const mockUserId = 'test-user-id';
      jest.spyOn(articleService, 'getArticleById').mockResolvedValue(null);

      await expect(articleController.getArticle(articleId, mockUserId)).rejects.toThrow(HttpException);
    });

    it('should handle errors and return a 500 status code', async () => {
      const articleId = 1;
      const mockUserId = 'test-user-id';
      jest.spyOn(articleService, 'getArticleById').mockRejectedValue(new Error('Test Error'));

      await expect(articleController.getArticle(articleId, mockUserId)).rejects.toThrow(HttpException);
    });
  });
});
