import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  database: 'postgres',
  username: 'postgres',
  password: 'postgres',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/**/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
