import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModalComponent } from './modal.component';
import { FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
    declarations: [CommonModalComponent],
    imports: [CommonModule, RouterModule.forChild([]), FormsModule, PipesModule, InlineSVGModule],
    exports: [CommonModalComponent],
})
export class AlertModule {}
