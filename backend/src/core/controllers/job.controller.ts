import { Controller, Get, Body, Res, Param, Query, Post, Patch } from '@nestjs/common';
import {  ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response} from 'express';
import { Filter } from 'src/utils/filter';
import { CreateJobDto } from '../dto/create-job-dto';
import { UpdateJobDto } from '../dto/update-job-dto';
import { JobService } from '../services/job.service';



@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(private readonly jobSvc: JobService) {}

  @Post()
  create(@Body() body: CreateJobDto) {
    return this.jobSvc.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get filterable jobs'})
  @ApiResponse({ status: 200, description: 'Returns filterable jobs'})
  async findAll(@Res() res: Response, @Query() query: Filter): Promise<void> {
    
    const result = await this.jobSvc.findAll(query);
    res.status(result.statusCode).json(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a job' })
  @ApiResponse({ status: 200, description: 'Returns job' })
  async findOne(@Res() res: Response, @Param('id') id: string):Promise<void> {
    const result = await this.jobSvc.findOne(id);
    res.status(result.statusCode).json(result);
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Updates job status' })
  @ApiParam({ name: 'id', type: 'string', required: true})
  @ApiResponse({ status: 200, description: 'Return job status successfully updated' })
  async update(@Res() res: Response, @Param('id') id: string, @Body() payload: UpdateJobDto) {
    const result = await this.jobSvc.update(id, payload);
    res.status(result.statusCode).json(result);
  }

}
