import { Module } from '@nestjs/common';
import { DatabaseModule } from 'server/common/database/database.module';
import { ArticleController } from './article.controller';
import { ArticleProviders } from './article.providers';
import { ArticleService } from './article.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ArticleController],
  providers: [...ArticleProviders, ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
