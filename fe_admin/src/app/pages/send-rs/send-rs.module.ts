import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendRSRouting } from './send-rs.routing';
import { SendRSComponent } from './send-rs.component';
@NgModule({
  declarations: [SendRSComponent],
  imports: [CommonModule, SendRSRouting, FormsModule, ReactiveFormsModule],
})
export class SendRSModule {}
