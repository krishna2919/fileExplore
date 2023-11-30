/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';

@Injectable()
export class DbConnection {
  private _dbList: { [key: string]: { db: Db; dbClient: MongoClient } } = {};

  async getDB(): Promise<Db> {
    const url = 'mongodb://127.0.0.1:27017';
    const dbName = 'FileUpload';
    const dbClient: MongoClient = await MongoClient.connect(url);
    const myDB = dbClient.db(dbName);
    this._dbList[dbName] = { db: myDB, dbClient: dbClient };

    return this._dbList[dbName].db;
  }
}
