import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DatabaseService } from 'database/connection.service'; 
import { CreateBooksDto } from './dtos/create-books.dto';
import { UpdateBookDto } from './dtos/update-books.dto';
import { Book } from './interface/books.interface';

@Injectable()
export class BookService {
  constructor(private db: DatabaseService) {}

  async create(book: CreateBooksDto): Promise<void> {
    const query = `
      INSERT INTO books (title, author, publication_year, isbn)
      VALUES ($1, $2, $3, $4)
    `;
    const values = [book.title, book.author, book.publication_year, book.isbn];
    await this.db.query(query, values);
  }

  async findAll(): Promise<Book[]> {
    const res = await this.db.query('SELECT * FROM books');
    return res.rows;
  }

  async findOne(id: number): Promise<Book> {
    const res = await this.db.query('SELECT * FROM books WHERE id = $1', [id]);
    const book = res.rows[0];
    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    return book;
  }

  async update(id: number, book: UpdateBookDto): Promise<void> {
    const query = `
      UPDATE books
      SET title = $1, author = $2, publication_year = $3, isbn = $4
      WHERE id = $5
    `;
    const values = [book.title, book.author, book.publication_year, book.isbn, id];
    await this.db.query(query, values);
  }

  async delete(id: number): Promise<void> {
    await this.db.query('DELETE FROM books WHERE id = $1', [id]);
  }

  async countByYear(year: number): Promise<number> {
    const res = await this.db.query('SELECT count_books_by_year($1)', [year]);
    return res.rows[0].count_books_by_year;
  }
}
