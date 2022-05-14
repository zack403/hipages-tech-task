import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { JobStatus } from "./enum";

export class Filter {


    @ApiProperty({enum: JobStatus, default: JobStatus.NEW})
    @IsEnum(JobStatus)
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    status: JobStatus

    @ApiProperty()
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    search: string;

    @ApiProperty({default: 1})
    @IsString()
    page: number;

    @ApiProperty({default: 5})
    @ApiPropertyOptional()
    @IsOptional()
    limit: number;
}