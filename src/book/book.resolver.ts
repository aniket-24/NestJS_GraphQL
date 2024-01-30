import { Args, Int, Query, Resolver, Mutation } from '@nestjs/graphql';
import { Book } from './book.schema';
import { Book as BookModel } from '../graphql';
import { BookService } from './book.service';
import { AddBookArgs } from './args/add.book.args';

@Resolver((of) => Book)
export class BookResolver {
  constructor(private readonly bookservice: BookService) {}

  //Query and Mutations
  @Query((returns) => [Book], { name: 'books' })
  getAllBooks(): BookModel[] {
    return this.bookservice.findAllBooks();
  }

  @Query((returns) => Book, { name: 'findBookById', nullable: true })
  getBookById(
    @Args({ name: 'bookId', type: () => Int }) id: number,
  ): BookModel {
    return this.bookservice.findBookById(id);
  }

  @Mutation((returns) => String, { name: 'deleteBook' })
  deleteBookById(
    @Args({ name: 'bookId', type: () => Int }) id: number,
  ): string {
    return this.bookservice.deleteBook(id);
  }

  @Mutation((returns) => String, { name: 'addBook' })
  addBook(@Args('addBookArgs') addBookArgs: AddBookArgs): string {
    return this.bookservice.addBook(addBookArgs);
  }

  @Mutation((returns) => String, { name: 'updateBook' })
  updateBook(
    @Args({ name: 'bookId', type: () => Int }) id: number,
    @Args('updateBookArgs') updateBookArgs: AddBookArgs,
  ): string {
    return this.bookservice.updateBook(id, updateBookArgs);
  }
}
