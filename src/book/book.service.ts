import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './model/book.model';
import { Model } from 'mongoose';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async createBook(input: CreateBookInput): Promise<Book> {
    const createdItem = new this.bookModel(input);
    return createdItem.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException('Book not found!');
    }
    return book;
  }

  async updateBook(input: UpdateBookInput): Promise<Book> {
    const existingBook = await this.bookModel.findById(input.id);
    if (!existingBook) {
      throw new NotFoundException('Book not found!');
    }
    Object.assign(existingBook, input);
    return existingBook.save();
  }

  async removeBook(id: string): Promise<boolean> {
    const result = await this.bookModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Book not found!');
    }
    return true;
  }
}
