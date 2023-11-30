import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateFolderDto } from './dto/createFolder.dto';
import { HandleResponse } from 'src/helper/handleResponse';
import { DbCollection, ResponseData } from 'src/constants/enum';
import { Messages } from 'src/constants/message';
import { DbConnection } from 'src/helper/db.connection';
import { CreateDirectoryDto } from './dto/createDirectory.dto';
import { ListOfDataDto } from './dto/listData.dto';
import { ObjectId } from 'mongodb';
import { FileUploadDto } from './dto/fileUpload.dto';

@Injectable()
export class FileService {
  constructor(private dbConnection: DbConnection) {}

  async createDirectory(dto: CreateDirectoryDto) {
    try {
      const { directory_Name } = dto;
      const parentId: any = null;
      const obj: any = {
        directory_Name,
        parentId,
      };

      const db = await this.dbConnection.getDB();
      const collection = db.collection(DbCollection.DIRECTORY);
      const result: any = await collection.insertOne(obj);
      return HandleResponse(
        HttpStatus.OK,
        ResponseData.SUCCESS,
        `Directory ${Messages.CREATE_SUCCESS}`,
        result?.insertedId,
        undefined,
      );
    } catch (error) {
      Logger.error(error);
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        ResponseData.ERROR,
        `${Messages.FAILED_TO} create directory.`,
        undefined,
        undefined,
      );
    }
  }

  async createFolder(dto: CreateFolderDto) {
    try {
      const { folder_name, parentId } = dto;
      const obj: any = {
        folder_name,
        parentId,
      };

      const db = await this.dbConnection.getDB();
      const collection = db.collection(DbCollection.DIRECTORY);
      const result: any = await collection.insertOne(obj);

      return HandleResponse(
        HttpStatus.OK,
        ResponseData.SUCCESS,
        `Folder ${Messages.CREATE_SUCCESS}`,
        result?.insertedId,
        undefined,
      );
    } catch (error) {
      Logger.error(error);
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        ResponseData.ERROR,
        `${Messages.FAILED_TO} create folder.`,
        undefined,
        undefined,
      );
    }
  }

  async uploadFiles(dto: FileUploadDto, files: Express.Multer.File[]) {
    try {
      const { parentId } = dto;
      const filesUploadsDetails: any = files['files'].map(
        (file: { filename: any }) => file.filename,
      );

      const obj: any = {
        files: filesUploadsDetails[0],
        parentId,
      };
      const db = await this.dbConnection.getDB();
      const collection = db.collection(DbCollection.DIRECTORY);
      const result: any = await collection.insertOne(obj);

      return HandleResponse(
        HttpStatus.OK,
        ResponseData.SUCCESS,
        `File ${Messages.CREATE_SUCCESS}`,
        result.insertedId,
        undefined,
      );
    } catch (error) {
      Logger.error(error);
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        ResponseData.ERROR,
        `${Messages.FAILED_TO} create file.`,
        undefined,
        undefined,
      );
    }
  }

  async list(dto: ListOfDataDto) {
    try {
      if (dto?.condition?.['_id']) {
        dto.condition['_id'] = new ObjectId(dto.condition['_id']);
      }
      const db = await this.dbConnection.getDB();
      const collection = db.collection(DbCollection.DIRECTORY);
      const result: any = await collection.find(dto?.condition ?? {});
      const finalResult = await result.toArray();

      return HandleResponse(
        HttpStatus.OK,
        ResponseData.SUCCESS,
        `list data ${Messages.GET_SUCCESS}`,
        finalResult,
        undefined,
      );
    } catch (error) {
      Logger.error(error);
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        ResponseData.ERROR,
        `${Messages.FAILED_TO} list successfully.`,
        undefined,
        undefined,
      );
    }
  }
}
