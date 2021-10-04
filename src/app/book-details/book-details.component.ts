import { BookStoreService } from './../shared/book-store.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../shared/book';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'jb-book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
    book: Book;

    constructor(
        private bs: BookStoreService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    getRating(num: number) {
        // create a array of length num
        return new Array(num);
    }

    ngOnInit(): void {
        const params = this.route.snapshot.paramMap;
        this.bs.getSingle(params.get('isbn')).subscribe((b) => (this.book = b));
    }

    removeBook() {
        if (confirm('Realy delete this book?')) {
            //  TODO: analyze this
            //  https://angular.io/guide/router  siehe Specifying a relative route
            this.bs
                .remove(this.book.isbn)
                .subscribe((res) => this.router.navigate(['/books']));
        }
    }
}
