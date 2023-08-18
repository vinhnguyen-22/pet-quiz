import { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'abstract-table',
  templateUrl: './abstract-table.html',
})
export class AbstractTableComponent implements OnInit {
  @Input() headers: any = [];
  @Input() datas: any = [];

  constructor() {}
  ngOnInit(): void {}
}
