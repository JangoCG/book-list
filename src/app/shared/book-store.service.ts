import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Book } from './book';
import { BookFactory } from './book-factory';
import { BookRaw } from './book-raw';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class BookStoreService {
    books: Book[];
    private api = 'https://api4.angular-buch.com';

    constructor(private readonly http: HttpClient) {}

    private errorHandler(error: HttpErrorResponse): Observable<any> {
        console.error('Fehler aufgetreten!');
        return throwError(error);
    }

    getAll(): Observable<Book[]> {
        return this.http
            .get<BookRaw[]>(`${this.api}/books`)
            .pipe(
                map(
                    (booksRaw) => booksRaw.map((b) => BookFactory.fromRaw(b)),
                    catchError(this.errorHandler)
                )
            );
    }

    getAllSearch(searchTerm: string): Observable<Book[]> {
        return this.http
            .get<BookRaw[]>(`${this.api}/books/search/$(searchTerm)`)
            .pipe(
                retry(3),
                map((booksRaw) => booksRaw.map((b) => BookFactory.fromRaw(b))),
                catchError(this.errorHandler)
            );
    }

    getSingle(isbn: string): Observable<Book> {
        return this.http.get<BookRaw>(`${this.api}/books/${isbn}`).pipe(
            retry(3),
            map((b) => BookFactory.fromRaw(b))
        );
    }

    remove(isbn: string): Observable<any> {
        return this.http.delete(`${this.api}/books/${isbn}`, {
            responseType: 'text',
        });
    }
}
