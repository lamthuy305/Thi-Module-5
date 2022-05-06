import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Book} from '../../model/book';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class BookService {
  books: Book[] = [];

  constructor(private http: HttpClient) {
  }
  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${API_URL}/books`);
  }

  getBookById(id): Observable<Book> {
    return this.http.get<Book>(`${API_URL}/books/${id}`);
  }

  createBook(book) {
    return this.http.post(`${API_URL}/books`, book);
  }

  editBook(id, book) {
    return this.http.put<Book>(`${API_URL}/books/${id}`, book);
  }

  deleteBook(id): Observable<Book> {
    return this.http.delete<Book>(`${API_URL}/books/${id}`);
  }
}
