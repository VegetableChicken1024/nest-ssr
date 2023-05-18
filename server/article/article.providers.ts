import { DataSource } from 'typeorm';
import { Article } from './entities/article.entity';
export const ArticleProviders = [
  {
    provide: 'ARTICLE_REPOSITORY',
    useFactory: (AppDataSource: DataSource) =>
      AppDataSource.getRepository(Article),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
