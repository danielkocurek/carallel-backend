import { Injectable, NotFoundException } from '@nestjs/common';
import { Article } from './article.interface';
import articles from './mock-articles-db';

@Injectable()
export class ArticleService {
  private articles: Article[] = articles; // Using a private property for articles

  async getArticles(): Promise<Article[]> {
    return this.articles;
  }

  async getArticleById(id: number) {
    const article = articles.find((a) => a.id === id);

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    return article;
  }

}
