import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';

@Component({
  selector: 'jb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  constructor(private bs: BookStoreService) {
  }

  keyUp$ = new Subject<string>();
  isLoading = false;
  foundBooks: Book[] = [];

  ngOnInit(): void {
    /**
     * Wait 500ms with debounceTime so we dont send a http request on every
     * keystroke
     * distinctUntilChanges: Doesnt allow that the same element can pass
     * into the data stream twice in a row. P.254
     */
    this.keyUp$.pipe(
      filter(term => term.length >= 3),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchTerm => this.bs.getAllSearch(searchTerm)),
      tap(() => this.isLoading = false)
    )
    .subscribe(books => this.foundBooks = books);
  }
}
