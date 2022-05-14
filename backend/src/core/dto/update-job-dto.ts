import { ApiProperty } from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsString } from "class-validator";
import { JobStatus } from "src/utils/enum";

export class UpdateJobDto {

    @ApiProperty({enum: JobStatus})
    @IsEnum(JobStatus)
    @IsString()
    @IsNotEmpty()
    status: JobStatus
}