import { OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import KTDualListbox from 'src/_core/assets/js/components/dual-listbox';

@Component({
  selector: 'app-dual-listbox',
  templateUrl: './dual-listbox.html',
  styleUrls: ['./dual-listbox.scss'],
})
export class DualListBoxComponent implements OnInit {
  @Input() data: any = 'data';
  @Output() obj: any = new EventEmitter<any>();
  constructor(public router: Router, private cd: ChangeDetectorRef) { }
  ngOnInit(): void { }

  ngOnChanges(): void {
    if (this.data?.list) {

      this.obj.emit({
        data: KTDualListbox(this.data),
      });
    }
  }
}
