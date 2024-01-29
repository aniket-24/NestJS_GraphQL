import { Query, Resolver } from '@nestjs/graphql';
import { Book } from './book.schema';
import { Book as BookModel } from '../graphql';

@Resolver((of) => Book)
export class BookResolver {
  @Query((returns) => [Book], { name: 'books' })
  getAllBooks() {
    let arr: BookModel[] = [
      { id: 1, title: 'Harry Potter', price: 500 },
      { id: 2, title: 'Hunger Games', price: 600 },
      { id: 3, title: 'Robin Hood', price: 900 },
    ];
    return arr;
  }
}
