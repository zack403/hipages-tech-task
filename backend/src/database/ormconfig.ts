import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from "dotenv";
import { CategoryEntity } from '../core/entities/category.entity' 
import { JobEntity } from '../core/entities/job.entity';
import { SuburbEntity } from '../core/entities/suburb.entity';
dotenv.config();

 
const databaseConfig: TypeOrmModuleOptions  = {
      type: 'mysql',
      host: process.env?.HOST,
      port: Number(process.env?.MYSQL_PORT),
      username: process.env?.USER,
      password: process.env?.PASS,
      database: process.env?.DB,
      entities: [SuburbEntity, JobEntity, CategoryEntity],
      synchronize: true,
      migrations: process.env?.NODE_ENV === 'production' ? ["dist/database/migrations/*.js"] : ["dist/database/migrations/*{.,.js}"],
      migrationsTableName: "migrations_typeorm",
      migrationsRun: false,
      cli: {
          migrationsDir: "src/database/migrations"
      },
      autoLoadEntities: true
};
 
export = databaseConfig;