import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsEmail } from "class-validator";

export class CreateJobDto {


    @IsNumber()
    @ApiProperty({default: 0})
    @IsNotEmpty()
    suburb_id: number;

    @ApiProperty({default: 0})
    @IsNumber()
    @IsNotEmpty()
    category_id: number;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    contact_name: string;

    @ApiProperty()
    @IsNotEmpty()
    contact_phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    contact_email: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price: number;
    
    @ApiProperty()
    @IsNotEmpty()
    description: string;
    

}




