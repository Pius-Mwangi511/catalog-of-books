import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BookService } from './books.service';
import { DatabaseService } from 'database/connection.service';

@Module({
  controllers: [BooksController],
  providers: [BookService,DatabaseService]
})
export class BooksModule {}
