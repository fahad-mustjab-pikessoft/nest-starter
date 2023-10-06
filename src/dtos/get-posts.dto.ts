import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class GetPostsDto{

    @ApiProperty()
    @IsString()
    orderBy: string = "DESC";

    @IsOptional()

    @ApiProperty()
    @Transform( ({value}) =>parseInt(value) )
    
    @IsNumber()
    @Min(0)
    take: number;

    @IsOptional()
    @ApiProperty()
    @Transform(({value})  => parseInt(value) )
    @Min(0)
    @IsNumber()
    skip: number ;

}