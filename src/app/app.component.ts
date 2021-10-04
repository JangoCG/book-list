import { Book } from './shared/book';
import { Component } from '@angular/core';

type ViewState = 'list' | 'details';
@Component({
    selector: 'jb-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    book: Book;
    viewState: ViewState = 'list';

    showList() {
        this.viewState = 'list';
    }
    showDetails(book: Book) {
        console.log('show details', book);
        this.book = book;
        this.viewState = 'details';
    }
}
