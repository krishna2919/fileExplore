/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';

export class ListOfDataDto {
  @ApiProperty({
    example: { _id: '655e03400cc711903fd3ff82' },
    type: 'object',
    format: 'object',
    required: false,
  })
  @IsObject()
  @IsOptional()
  condition: object;
}
