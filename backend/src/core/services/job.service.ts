import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import { IClientReturnObject } from 'src/types/client-return-obj';
import { clientFeedback } from 'src/utils/client-return-function'; 
import { JobStatus } from 'src/utils/enum';
import { Filter } from 'src/utils/filter'; 
import { Brackets } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateJobDto } from '../dto/create-job-dto';
import { UpdateJobDto } from '../dto/update-job-dto';
import { JobEntity } from '../entities/job.entity';



@Injectable()
export class JobService {
  logger = new Logger(JobService.name)

  constructor(@InjectRepository(JobEntity) private jobRepo: Repository<JobEntity>) {}

  
  async create(payload: CreateJobDto): Promise<IClientReturnObject> {
    

    try {

      const exist = await this.jobRepo.findOne({where: {description: payload.description}});
      
      if(exist) {
        return clientFeedback({
          error: true,
          errorMessage:  `Job description already exist`,
          statusCode: 400
        })
      }
  
      const data = plainToClass(JobEntity, payload);

      await this.jobRepo.save(data);

      return ({
        statusCode: HttpStatus.OK,
        sucessMessage: 'Job created successfully',
        error: false
      });

    } catch (error) {
      
      this.logger.log(`Error in creating job - ${error.message}`, "JobSvc.create");
      
      return ({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: `Error while creating job - Error: ${error.message}`,
        error: true
      });

    }

  }
  
  
  async findAll({status, page, search, limit}: Filter): Promise<IClientReturnObject> {
    try {

      const result: Array<JobEntity> = [];
      let totalCount = 0;
      if(search) {
        const [items, count] = await this.jobRepo.createQueryBuilder("j")
                .where("j.status =:status", {status})
                .leftJoinAndSelect("j.category", "category")
                .leftJoinAndSelect("j.suburb", "suburb")
                .andWhere(new Brackets(qb => {
                    qb.where("j.description Like :d", { d: `%${search}%` })
                    .orWhere("j.status Like :st", { st: `%${search}%` })
                    .orWhere("j.contact_name Like :n", { n: `%${search}%` })
                    .orWhere("j.contact_email Like :e", { e: `%${search}%` })
                    .orWhere("category.name Like :cname", { cname: `%${search}%`})
                    .orWhere("suburb.name Like :sname", { sname: `%${search}%` })
                }))
                .orderBy("j.created_at", "DESC")
                .skip(page ? limit * (page - 1) : 0)
                .take(limit)
                .getManyAndCount();

        result.push(...items);
        totalCount = count;

        return clientFeedback({
          error: false,
          sucessMessage: "Success",
          data: {
            page,
            totalCount,
            data: result,
            
          },
          statusCode: 200
        })
        
    }

    const [items, count] =  await this.jobRepo.findAndCount({ 
      order: {created_at: 'DESC'}, where: {status}, relations: ['category', 'suburb'], 
      take: limit, 
      skip: page ? limit * (page - 1) : 0});

      result.push(...items);
      totalCount = count;
      
    
      return clientFeedback({
        error: false,
        sucessMessage: "Success",
        data: {
          page,
          totalCount,
          data: result
        },
        statusCode: 200
      })
    } catch (error) {
      return clientFeedback({
        error: true,
        errorMessage:  `Something failed, ${error.message}`,
        statusCode: 500
      })
    }
    
  }

  async findOne(id: string):Promise<IClientReturnObject> {
    if(!id) {
      return clientFeedback({
        error: true,
        errorMessage:  `Id is required`,
        statusCode: 400
      })
    }

    try {
      const s = await this.jobRepo.findOne(id, {relations: ['category', 'suburb']});
      return clientFeedback({
        error: false,
        sucessMessage: "Success",
        data: s,
        statusCode: 200
      })
      
    } catch (error) {
      return clientFeedback({
        error: true,
        errorMessage:  `Something failed, ${error.message}`,
        statusCode: 500
      })
    }
    
  }

  async update(id: string, payload: UpdateJobDto): Promise<IClientReturnObject> {
    
    try {
      const job = await this.jobRepo.findOne(id);

      if(!job) {
        return clientFeedback({
          error: true,
          errorMessage:  "Job not found",
          statusCode: 400
        })
      }
      
      job.status = payload.status;
      job.updated_at = new Date();
          
      await this.jobRepo.save(job);

      return clientFeedback({
        error: false,
        sucessMessage: "Successfully updated",
        statusCode: 200
      });

    } catch (error) {
      return clientFeedback({
        error: true,
        errorMessage:  `Something failed, ${error.message}`,
        statusCode: 500
      })
    }
    
  }

  async remove(id: string): Promise<IClientReturnObject> {
    const bus = await this.jobRepo.findOne(id);
    if(bus) {
        await this.jobRepo.delete({ id: bus.id });
        return clientFeedback({
          error: false,
          sucessMessage: "Successfully deleted",
          statusCode: 200
        });   
    }

    return clientFeedback({
      error: true,
      errorMessage:  'Job not found',
      statusCode: 400
    })
    
  }

}
