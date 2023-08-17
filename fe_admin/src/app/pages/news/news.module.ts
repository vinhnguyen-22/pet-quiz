import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { UsersRouting } from './news-routing';
import { NewComponent } from './news.component';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';
import { EmptyTableModule } from 'src/app/modules/empty-table/empty-table.module';
@NgModule({
  declarations: [NewComponent],
  imports: [
    CommonModule,
    PipesModule,
    HttpClientModule,
    UsersRouting,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    TranslationModule,
    EmptyTableModule,
  ],
})
export class NewModule {}
