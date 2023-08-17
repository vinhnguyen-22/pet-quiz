import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmptyTableModule } from 'src/app/modules/empty-table/empty-table.module';
import { StudentsListComponent } from './students/list.component';
import { TeacherRouting } from './student-management-routing';
import { StudentsComponent } from './student-management.component';
import { DatePipe } from '@angular/common';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';
import { SharedModule } from 'src/app/modules/SharedModule/shared.module';
import { ParentsComponent } from './parents/parents.component';
import { PagingModule } from 'src/app/modules/paging/paging.module';
import { StudentStoreComponent } from './student-store/list.component';
import { LoadingModule } from 'src/app/modules/loading/loading.module';
@NgModule({
  declarations: [StudentsComponent, StudentsListComponent, ParentsComponent, StudentStoreComponent],
  imports: [
    CommonModule,
    SharedModule,
    TeacherRouting,
    FormsModule,
    ReactiveFormsModule,
    PagingModule,
    InlineSVGModule,
    EmptyTableModule,
    TranslationModule,
    NgSelectModule,
    LoadingModule
  ],
  providers: [DatePipe],
})
export class StudentManagementModule { }
