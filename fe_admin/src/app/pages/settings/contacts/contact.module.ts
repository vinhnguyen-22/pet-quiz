import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactRouting } from './contact.routing';
import { ContactComponent } from './contact.component';
import { DualListBoxModule } from 'src/app/modules/dual-listbox/dual-listbox.module';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, ContactRouting, FormsModule, ReactiveFormsModule, DualListBoxModule, InlineSVGModule],
})
export class ContactModule {}
