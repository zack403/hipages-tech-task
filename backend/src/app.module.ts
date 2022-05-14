import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import * as dbConfig from './database/ormconfig';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';




@Module({
  imports: [
    CoreModule,
    CacheModule.register({
      ttl: 10
    }),
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(dbConfig),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    AppService
  ],
})
export class AppModule {}
