import { join } from 'path';
import { getConfig } from 'server/utils';
import { DataSource, DataSourceOptions } from 'typeorm';
const databaseType: DataSourceOptions['type'] = 'mysql';
const { DATABASE_CONFIG } = getConfig();

const config = {
  ...DATABASE_CONFIG,
  type: databaseType,
  entities: [join(__dirname, '../../**/*.entity{.ts,.js}')],
};

const dataSource = new DataSource(config);

export const DatabaseProviders = [
  {
    provide: 'MYSQL_DATA_SOURCE',
    useFactory: async () => {
      await dataSource.initialize();
      return dataSource;
    },
  },
];
