import { OnInit, EventEmitter, Output } from '@angular/core';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'abstract-table',
  templateUrl: './abstract-table.html',
  styleUrls: ['./abstract-table.scss'],
})
export class AbstractTableComponent implements OnInit {
  @Input() objectDataTable: any = {};
  @Output('actions') actions = new EventEmitter<any>();
  constructor() { }
  ngOnInit(): void { }

  handleActions = (actionName: string, idSelected: number) => {
    this.actions.emit({ actionName, idSelected });
  };
}
