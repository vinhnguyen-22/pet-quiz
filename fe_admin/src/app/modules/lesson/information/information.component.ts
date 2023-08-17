import { AKITA_STORE, TYPE_LESSON } from './../../../containers/constants/index';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { StructureService } from 'src/app/containers/services/structure.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TopicService } from 'src/app/containers/services/topic.service';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lesson-information',
  templateUrl: './information.html',
})
export class InformationComponent implements OnInit, OnChanges {
  @Input() isRequestInfo: any;
  @Input() information: any = {};
  @Output() onEmitInformation = new EventEmitter<any>();
  @Output() onEmitValidate = new EventEmitter<any>();

  @Output() onEmitStructureChanged = new EventEmitter<any>();

  public Editor = ClassicEditor;
  END_POINT_STRUCTURE = 'structures';
  END_POINT_TOPIC = 'topics';
  programSettings: IDropdownSettings = {
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn',
    defaultOpen: false,
    noDataAvailablePlaceholderText: 'Không có dữ liệu',
  };

  english = 'Tiếng Anh';
  vietnamese = 'Tiếng Việt';

  formGroup: FormGroup;
  grades: any = [];
  structures: any = [];
  typeLesson = TYPE_LESSON;
  topics: any = [];
  sectionList: string;
  lessonPerWeek: any = [
    { item_id: 2, item_text: '2 Tiết' },
    { item_id: 3, item_text: '3 Tiết' },
    { item_id: 4, item_text: '4 Tiết' },
    { item_id: 5, item_text: '5 Tiết' },
  ];

  constructor(
    private structureService: StructureService,
    private topicService: TopicService,
    private fb: FormBuilder,
    private optionQuery: OptionQuery,
    private cd: ChangeDetectorRef
  ) {}

  ngOnChanges(d): void {
    if (this.isRequestInfo) {
      if (this.formGroup.valid) {
        this.onEmitValidate.emit(true);
        this.information.listLPW = this.formGroup.value.programList.map((x) => x.item_id).join(',');
        let model = { ...this.information, ...this.formGroup.value };
        this.onEmitInformation.emit(model);
      } else {
        this.onEmitValidate.emit(false);
        this.formGroup.markAllAsTouched();
      }
    }

    if (this.information && d.information) {
      this.loadOption();
    }
  }

  ngOnInit(): void {
    this.loadStructure();
  }

  loadOption() {
    let options$ = this.optionQuery.selectAll();
    options$.subscribe((options) => {
      this.setOption(options);
    });
  }
  loadLesson() {
    this.loadTopic(this.information.gradeId, 'first');
    this.information.programList = this.formatProgram(this.information.listLPW);
    this.getSectionByStructureId(this.information.structureId);
    this.formGroup = this.fb.group({
      gradeId: [
        {
          value: this.information.gradeId,
          disabled: this.information.id > 0,
        },
        Validators.compose([Validators.required]),
      ],
      type: [
        {
          value: this.information.type,
          disabled: this.information.id > 0,
        },
        Validators.compose([Validators.required]),
      ],
      name: [this.information.name, Validators.compose([Validators.required])],
      structureId: [
        {
          value: this.information.structureId,
          disabled: this.information.type == 2 || this.information.id > 0,
        },
        Validators.compose([Validators.required]),
      ],
      topicId: [
        {
          value: this.information.topicId,
          disabled: this.information.id > 0,
        },
        Validators.compose([Validators.required]),
      ],
      sortId: [this.information.sortId, Validators.compose([Validators.required])],
      programList: [this.information.programList, Validators.compose([Validators.required])],
      targetLanguage: [
        {
          value: this.information.targetLanguage,
          disabled: this.information.type == 2,
        },
      ],
      languageExtend: [
        {
          value: this.information.languageExtend,
          disabled: this.information.type == 2,
        },
      ],
      target: [
        {
          value: this.information.target,
          disabled: this.information.type == 2,
        },
      ],
      docTool: [
        {
          value: this.information.docTool,
          disabled: this.information.type == 2,
        },
      ],
      targetLanguageEn: [
        {
          value: this.information.targetLanguageEn,
          disabled: this.information.type == 2,
        },
      ],
      languageExtendEn: [
        {
          value: this.information.languageExtendEn,
          disabled: this.information.type == 2,
        },
      ],
      targetEn: [
        {
          value: this.information.targetEn,
          disabled: this.information.type == 2,
        },
      ],
      docToolEn: [
        {
          value: this.information.docToolEn,
          disabled: this.information.type == 2,
        },
      ],
    });
  }
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup?.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }
  setOption(options: any) {
    if (options.length > 0) {
      this.grades = options[AKITA_STORE.GRADE];
      if (!this.information.id) {
        this.information.gradeId = this.grades[0].id;
      }
      this.loadLesson();
      this.cd.detectChanges();
    }
  }

  onStructureChanged = (event: any) => {
    const structureId = event.target.value;
    this.getSectionByStructureId(structureId);
    let currentStructure = this.structures.find((x) => x.id == structureId);
    this.onEmitStructureChanged.emit({ sections: currentStructure.sections });
  };

  gradeChanged = (event) => {
    let gradeId = event.target.value;
    this.loadTopic(gradeId, 'second');
  };
  typeChanged = (event) => {
    let type = event.target.value;
    if (type == 2) {
      this.formGroup.controls['structureId'].disable();
      this.formGroup.controls['structureId'].setValidators(Validators.compose([]));
      this.formGroup.controls['targetLanguage'].disable();
      this.formGroup.controls['languageExtend'].disable();
      this.formGroup.controls['target'].disable();
      this.formGroup.controls['docTool'].disable();
      this.formGroup.controls['targetLanguageEn'].disable();
      this.formGroup.controls['languageExtendEn'].disable();
      this.formGroup.controls['targetEn'].disable();
      this.formGroup.controls['docToolEn'].disable();
    } else {
      this.formGroup.controls['structureId'].setValidators(Validators.compose([Validators.required]));
      this.formGroup.controls['structureId'].enable();
      this.formGroup.controls['targetLanguage'].enable();
      this.formGroup.controls['languageExtend'].enable();
      this.formGroup.controls['target'].enable();
      this.formGroup.controls['docTool'].enable();
      this.formGroup.controls['targetLanguageEn'].enable();
      this.formGroup.controls['languageExtendEn'].enable();
      this.formGroup.controls['targetEn'].enable();
      this.formGroup.controls['docToolEn'].enable();
    }
  };
  getSectionByStructureId = (structureId: any) => {
    let sectionListStr = '';
    if (structureId && this.structures.length > 0) {
      let currentStructure = this.structures.find((x) => x.id == structureId);
      for (let index = 0; index < currentStructure.sections.length; index++) {
        sectionListStr += currentStructure.sections[index].name + ', ';
      }
      this.sectionList = sectionListStr.trim().slice(0, -1);
      this.cd.detectChanges();
    }
  };

  loadTopic(gradeId, type) {
    this.topicService
      .getByModel(this.END_POINT_TOPIC, { searchTerm: '', gradeId })
      .then((res) => {
        this.topics = res;
        if (!(type == 'first' && this.information.id)) {
          this.formGroup.controls['topicId'].setValue(this.topics.length > 0 ? this.topics[0].id : '');
        }
        this.cd.detectChanges();
      })
      .catch();
  }

  loadStructure() {
    this.structureService
      .getByModel(this.END_POINT_STRUCTURE, { searchTerm: '', status: 1 })
      .then((res) => {
        this.structures = res;
        this.cd.detectChanges();
      })
      .catch();
  }

  formatProgram(lessonPerWeek) {
    let listLpw = [];
    if (lessonPerWeek) {
      listLpw = this.lessonPerWeek.filter((l) => {
        return lessonPerWeek.includes(l.item_id);
      });
      return listLpw || [];
    }
  }
}
