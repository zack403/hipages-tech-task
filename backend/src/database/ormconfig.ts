import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from "dotenv";
dotenv.config();

 
const databaseConfig: TypeOrmModuleOptions  = {
      type: 'mysql',
      host: process.env?.HOST || 'database',
      port: Number(process.env?.MYSQL_PORT) || 3306,
      username: process.env?.USER || 'root',
      password: process.env?.PASS || 'hipages_pass',
      database: process.env?.DB || 'hipagesDB',
      entities: [
        __dirname + '/../**/*.entity.ts',
        __dirname + '/../**/*.entity.js',
      ],
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