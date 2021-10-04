import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'jb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  keyUp$ = new Subject<string>();

  ngOnInit(): void {
    this.keyUp$
      .subscribe(e => console.log(e));
  }

}
