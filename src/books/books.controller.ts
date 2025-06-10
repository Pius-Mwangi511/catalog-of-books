import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpException, ValidationPipe } from '@nestjs/common';
import { BookService } from './books.service'; 
import { CreateBooksDto } from './dtos/create-books.dto';
import { UpdateBookDto } from './dtos/update-books.dto';
 
@Controller('books')
export class BooksController {

  constructor(private readonly service: BookService) {}

  @Post()
  async create(@Body(ValidationPipe) dto: CreateBooksDto) {
    await this.service.create(dto);
    return { message: 'Book created successfully' };
  }

  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const book = await this.service.findOne(+id);
    if (!book) throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    return book;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body(ValidationPipe) dto: UpdateBookDto) {
    await this.service.update(+id, dto);
    return { message: 'Book updated successfully' };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.service.delete(+id);
    return { message: 'Book deleted successfully' };
  }
}
