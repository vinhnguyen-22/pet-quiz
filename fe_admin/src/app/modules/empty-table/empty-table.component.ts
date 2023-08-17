import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-empty-table',
    templateUrl: './empty-table.html',
    styleUrls: ['./empty-table.scss'],
})
export class EmptyTableComponent implements OnInit {
    @Input() length: any = 'length';
    @Input() height: any = 'height';
    @Input() text: any = 'text';

    constructor() {}
    ngOnInit(): void {}
}
