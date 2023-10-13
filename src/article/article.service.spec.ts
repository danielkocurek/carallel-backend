import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ArticleService } from './article.service';
import articles from './mock-articles-db';

describe('ArticleService', () => {
  let articleService: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleService],
    }).compile();

    articleService = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(articleService).toBeDefined();
  });

  describe('getArticles', () => {
    it('should return an array of articles', async () => {
      const result = await articleService.getArticles();
      expect(result).toEqual(articles);
    });
  });

  describe('getArticleById', () => {
    it('should return an article by ID', async () => {
      const articleId = 1;
      const result = await articleService.getArticleById(articleId);
      const expectedArticle = articles.find((a) => a.id === articleId);
      expect(result).toEqual(expectedArticle);
    });

    it('should throw NotFoundException for non-existent ID', async () => {
      const nonExistentId = 999;
      try {
        await articleService.getArticleById(nonExistentId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe(`Article with ID ${nonExistentId} not found`);
      }
    });
  });
});
