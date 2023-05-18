import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  // 自增主键id
  @PrimaryGeneratedColumn()
  id: number;

  // 文章标题
  @Column({ length: 100, nullable: false })
  title: string;
}
