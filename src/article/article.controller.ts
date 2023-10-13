import { Controller, Get, Headers, Param, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ArticleService } from './article.service';
import { HistoryService } from '../history/history.service';

@Controller('articles')
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService,
        private readonly historyService: HistoryService
    ) {}

    @Get()
    async getArticles() {
        try {
            const articles = await this.articleService.getArticles();
            return articles;
        } catch (error) {
            throw new HttpException('Failed to fetch articles', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async getArticle(@Param('id', ParseIntPipe) articleId: number, @Headers('x-user-info') userId: string) {
        try {

            const article = await this.articleService.getArticleById(articleId);

            if (!article) {
                throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
            }

            // Store link history when the article is accessed
            await this.historyService.storeHistory(articleId, userId);

            return article;
        } catch (error) {
            throw new HttpException('Failed to fetch article', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}