import { OnInit, EventEmitter, Output } from '@angular/core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.html',
})
export class FilterComponent implements OnInit {
  @Input() objFilter: any = {};
  @Output('filter') filter = new EventEmitter<any>();
  constructor() {}
  ngOnInit(): void {}

  handleFilter = (actionName: string) => {
    this.filter.emit({
      key: actionName,
      filter: this.objFilter.filter,
    });
  };
}
