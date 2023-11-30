/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFolderDto {
  @ApiProperty({
    example: 'Science city folder',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  folder_name: string;

  @ApiProperty({
    example: 'sdfgfdgdgdfgdfgfdgdfgbfdgd',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  parentId: string;
}
