import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ModalNewComponent } from './modal-new.component';
import { PipesModule } from 'src/pipes/pipes.module';

@NgModule({
  declarations: [ModalNewComponent],
  imports: [CommonModule, RouterModule, NgbModule, PipesModule, NgbModalModule],
  exports: [ModalNewComponent],
})
export class ModalNewModule {}
