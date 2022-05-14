import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobController } from './controllers/job.controller';
import { CategoryEntity } from './entities/category.entity';
import { JobEntity } from './entities/job.entity';
import { SuburbEntity } from './entities/suburb.entity';
import { JobService } from './services/job.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      SuburbEntity,
      CategoryEntity,
      JobEntity
    ])
  ],
  controllers: [JobController],
  providers: [JobService]
})
export class CoreModule {}
