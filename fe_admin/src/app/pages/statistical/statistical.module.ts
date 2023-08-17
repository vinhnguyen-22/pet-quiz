import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StatisticalComponent } from './statistical.component';
import { StatisticalRoutingModule } from './statistical-routing';
import { NgApexchartsModule } from 'ng-apexcharts';
import { EmptyTableModule } from 'src/app/modules/empty-table/empty-table.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';

@NgModule({
  declarations: [StatisticalComponent],
  imports: [CommonModule, EmptyTableModule, TranslationModule, StatisticalRoutingModule, FormsModule, ReactiveFormsModule, NgbModule, NgApexchartsModule, PipesModule],
})
export class StatisticalModule { }
