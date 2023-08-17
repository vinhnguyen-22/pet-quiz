import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    CommonModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ],
  exports: [CommonModalComponent]
})
export class SharedModule { }