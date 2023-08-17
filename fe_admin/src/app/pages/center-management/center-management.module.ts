import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SchoolImplementComponent } from './schools/school-implement/school-edit.component';
import { SchoolEditComponent } from './schools/school-edit/school-edit.component';
import { SchoolListComponent } from './schools/list.component';
import { SchoolRouting } from './center-management-routing';
import { SchoolsComponent } from './center-management.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';
import { DualListBoxModule } from '../../modules/dual-listbox/dual-listbox.module';
import { EmptyTableModule } from '../../modules/empty-table/empty-table.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ClassesEditComponent } from './classes/classes-edit/classes-edit.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TopicsModule } from '../topic-management/topics.module';
import { TopicListCPModule } from 'src/app/modules/topic-list/topic-list-cp.module';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'src/app/modules/SharedModule/shared.module';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';
import { AddStudentComponent } from './add-student/add-student.component';
import { TeacherEditComponent } from './teachers/teacher-edit/teacher-edit.component';
import { TeacherListComponent } from './teachers/list.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoadingModule } from 'src/app/modules/loading/loading.module';
@NgModule({
  declarations: [
    SchoolEditComponent,
    SchoolListComponent,
    SchoolsComponent,
    ClassesComponent,
    ClassDetailComponent,
    TeacherListComponent,
    TeacherEditComponent,
    ClassesEditComponent,
    SchoolImplementComponent,
    AddStudentComponent,
    StudentEditComponent,
    StudentDetailComponent,
  ],
  imports: [
    CommonModule,
    SchoolRouting,
    TopicsModule,
    TopicListCPModule,
    CKEditorModule,
    NgMultiSelectDropDownModule,
    EmptyTableModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    DualListBoxModule,
    SharedModule,
    LoadingModule,
    TranslationModule,
    NgSelectModule
  ],
  providers: [DatePipe],
})
export class SchoolModule { }
