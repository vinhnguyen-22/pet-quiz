import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmptyTableModule } from 'src/app/modules/empty-table/empty-table.module';
import { StructureEditComponent } from './structures/structure-edit/structure-edit.component';
import { StructureListComponent } from './structures/list.component';
import { StructuresRouting } from './structure-routing';
import { StructureComponent } from './structure.component';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';

@NgModule({
  declarations: [StructureEditComponent, StructureListComponent, StructureComponent],
  imports: [CommonModule, EmptyTableModule, StructuresRouting, FormsModule, ReactiveFormsModule, InlineSVGModule, TranslationModule],
})
export class StructureModule { }
