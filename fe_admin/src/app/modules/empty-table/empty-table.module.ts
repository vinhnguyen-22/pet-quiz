import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmptyTableComponent } from './empty-table.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [EmptyTableComponent],
    imports: [CommonModule, RouterModule, NgbModule, HttpClientModule, FormsModule, ReactiveFormsModule, InlineSVGModule, NgbModalModule],
    exports: [EmptyTableComponent],
})
export class EmptyTableModule {}
