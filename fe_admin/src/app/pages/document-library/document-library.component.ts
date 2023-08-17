import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'document-library-component',
  template: '<router-outlet></router-outlet>',
})
export class DocumentLibraryComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
