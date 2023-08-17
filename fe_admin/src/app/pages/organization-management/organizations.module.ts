import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationEditComponent } from './organizations/organization-edit/organization-edit.component';
import { OrganizationListComponent } from './organizations/list.component';
import { OrganizationsRouting } from './organizations-routing';
import { OrganizationsComponent } from './organizations.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EmptyTableModule } from 'src/app/modules/empty-table/empty-table.module';
import { DualListBoxModule } from '../../modules/dual-listbox/dual-listbox.module';
import { CenterEditComponent } from './organizations/center-edit/center-edit.component';
import { SchoolEditComponent } from './organizations/school-edit/school-edit.component';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';
import { PagingModule } from 'src/app/modules/paging/paging.module';
import { LoadingModule } from 'src/app/modules/loading/loading.module';

@NgModule({
  declarations: [OrganizationEditComponent, CenterEditComponent, OrganizationListComponent, OrganizationsComponent, SchoolEditComponent],
  imports: [
    CommonModule,
    EmptyTableModule,
    OrganizationsRouting,
    PagingModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    DualListBoxModule,
    TranslationModule,
    LoadingModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
})
export class OrganizationsModule { }
