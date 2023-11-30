import {
  Controller,
  HttpCode,
  Post,
  Body,
  HttpStatus,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { CreateFolderDto } from './dto/createFolder.dto';
import { CreateDirectoryDto } from './dto/createDirectory.dto';
import { ListOfDataDto } from './dto/listData.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/helper/multer';
import { FileUploadDto } from './dto/fileUpload.dto';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('createDirectory')
  createDirectory(@Body() dto: CreateDirectoryDto) {
    return this.fileService.createDirectory(dto);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('createFolder')
  createFolder(@Body() dto: CreateFolderDto) {
    return this.fileService.createFolder(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/createFile')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'files', maxCount: 10 }], {
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 10, // 10 MB limit
      },
    }),
  )
  fileUploads(@Body() dto: FileUploadDto, @UploadedFiles() files: any) {
    return this.fileService.uploadFiles(dto, files);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('list')
  list(@Body() dto: ListOfDataDto) {
    return this.fileService.list(dto);
  }
}
