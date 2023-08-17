import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendFBRouting } from './send-fb-routing';
import { SendFBComponent } from './send-fb.component';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';
@NgModule({
  declarations: [SendFBComponent],
  imports: [CommonModule, SendFBRouting, FormsModule, ReactiveFormsModule, TranslationModule],
})
export class SendFBModule { }
