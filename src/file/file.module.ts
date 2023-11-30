import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { DbConnection } from 'src/helper/db.connection';

@Module({
  controllers: [FileController],
  providers: [FileService, DbConnection],
})
export class FileModule {}
