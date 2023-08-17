import { ToastrService } from 'ngx-toastr';
import { LessonService } from './../../../../containers/services/lesson.service';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import KTWizard from '../../../../../assets/js/components/wizard';
import { KTUtil } from '../../../../../assets/js/components/util';
import { ActivatedRoute, Router } from '@angular/router';
import { FormCanDeactivate } from 'src/app/containers/guards/can-deactivate/can-deactivate';
import { HttpEventType } from '@angular/common/http';
import { ShareService } from 'src/app/containers/services/share/share.service';

@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrls: ['./lesson-edit.scss'],
})
export class LessonEditComponent extends FormCanDeactivate implements OnInit {
  isSubmitted: boolean;

  @ViewChild('wizard', { static: true }) el: ElementRef;
  EMPTY_LESSON = {};
  id: number;
  wizard: any;
  lesson: any;
  step: number = 1;
  isRequestInfo = false;
  isValid = true;
  isRequestContent = false;
  information: any = {
    id: 0,
    gradeId: '',
    topicId: '',
    type: 1,
    wordFilePath: '',
    pdfFilePath: '',
    wordFileName: '',
    pdfFileName: '',
    structureId: '',
    name: '',
    target: '',
    status: 0,
    targetLanguage: '',
    languageExtend: '',
    docTool: '',
    listLPW: '',
    targetEn: '',
    targetLanguageEn: '',
    languageExtendEn: '',
    docToolEn: '',
  };
  content: any = {
    sections: [
      {
        activities: [],
      },
    ],
  };

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private lessonService: LessonService,
    private shareService: ShareService,
    private cd: ChangeDetectorRef,

    private toastr: ToastrService
  ) {
    super();
    this.id = this.actRoute.snapshot.params['id'] || null;
    this.step = this.actRoute.snapshot.params['step'] || 1;
  }

  ngOnInit() {
    this.loadLesson();
  }

  ngAfterViewInit(): void {
    this.wizard = new KTWizard(this.el.nativeElement, {
      startStep: this.step,
    });
    this.wizard.on('beforeNext', (wizardObj) => {});

    this.wizard.on('change', (wizardObj) => {
      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);

      let step = wizardObj.getStep();
      if (step == 1) {
        this.isRequestInfo = true;
        this.cd.detectChanges();
        this.isRequestInfo = false;
      }

      if (!this.isValid) {
        wizardObj.stop();
      }
    });
  }

  loadLesson() {
    if (this.id) {
      this.lessonService
        .getById(this.id)
        .then((res: any) => {
          this.lesson = res;
          this.setInformation(res);
          this.setContent(res);
          this.cd.detectChanges();
        })
        .catch((e) => {});
    } else {
      this.lesson = this.EMPTY_LESSON;
    }
  }

  setContent(param: any) {
    var dic: any = {};
    for (var sectionIndex = 0; sectionIndex < param.sections.length; sectionIndex++) {
      var section = param.sections[sectionIndex];

      for (var activityIndex = 0; activityIndex < section.activities.length; activityIndex++) {
        if (!dic[sectionIndex]) {
          dic[sectionIndex] = {};
        }

        dic[sectionIndex][activityIndex] = 0;
      }
    }

    this.content = {
      sections: param.sections,
      activeActivityTabs: dic,
    };

    this.cd.detectChanges();
  }

  setInformation(param: any) {
    this.information = {
      id: param.id,
      gradeId: param.topic.gradeId,
      topicId: param.topic.id,
      type: param.type,
      wordFilePath: param.wordFilePath,
      pdfFilePath: param.pdfFilePath,
      wordFileName: param.wordFileName,
      pdfFileName: param.pdfFileName,
      structureId: param.structureId,
      name: param.name,
      target: param.target,
      targetLanguage: param.targetLanguage,
      languageExtend: param.languageExtend,
      docTool: param.docTool,
      listLPW: param.listLPW,
      sortId: param.sortId,
      targetEn: param.targetEn,
      targetLanguageEn: param.targetLanguageEn,
      languageExtendEn: param.targetLanguageEn,
      docToolEn: param.docToolEn,
    };
  }
  onSubmit() {
    this.isRequestContent = true;
    this.cd.detectChanges();
  }

  onEmitStructureChanged(param: any) {
    this.setContent(param);
  }
  onEmitValidate(event) {
    this.isValid = event;
  }
  onEmitInformation(information) {
    this.lesson = {
      ...this.lesson,
      ...information,
    };
  }
  onEmitContent(sections) {
    let activities = sections.reduce((p, c) => {
      return [...p, ...c.activities];
    }, []);

    activities = activities.filter((x) => {
      return x.name != '';
    });
    this.lesson = {
      ...this.lesson,
      activities,
    };
    delete this.lesson.topic;
    delete this.lesson.structure;

    this.save();
  }
  save() {
    this.isSubmitted = true;
    this.lessonService
      .update(this.lesson)
      .then((res: any) => {
        this.router.navigate(['/lessons'], { relativeTo: this.actRoute });
        this.toastr.success('', 'Thêm bài học thành công');
      })
      .catch((e) => {
        this.isSubmitted = false;
        this.toastr.error('', 'Thêm bài học thất bại. Xin vui lòng thử lại !');
      });
  }
  uploadRecourse = (type: string) => {
    let inputTag = document.createElement('input');
    inputTag.type = 'file';
    if (type == 'word') {
      inputTag.accept = '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (type == 'pdf') {
      inputTag.accept = '.pdf';
    }
    let folderStore = 'lessons/document';
    inputTag.onchange = (_this: any) => {
      let files = _this.target.files;
      let fileToUpload = <File>files[0];

      this.shareService
        .uploadProgress(files, folderStore, type)
        .then((res: any) => {
          res.subscribe((event: any) => {
            switch (event.type) {
              case HttpEventType.Sent:
                break;
              case HttpEventType.ResponseHeader:
                break;
              case HttpEventType.UploadProgress:
                let name = '';
                if (type == 'pdf') {
                  name = 'progressPdf';
                } else {
                  name = 'progressWord';
                }
                this.lesson[name] = Math.round((event.loaded / event.total) * 100);
                this.cd.detectChanges();
                break;
              case HttpEventType.Response:
                if (type == 'pdf') {
                  this.lesson.pdfFilePath = event.body.path;
                  this.lesson.pdfFileName = fileToUpload.name;
                } else if (type == 'word') {
                  this.lesson.wordFilePath = event.body.path;
                  this.lesson.wordFileName = fileToUpload.name;
                }
                this.cd.detectChanges();
            }
          });
        })

        .catch((e: any) => {});
    };
    inputTag.click();
  };
  removeDoc(type) {
    if (type == 'pdf') {
      this.lesson.pdfFilePath = '';
      this.lesson.pdfFileName = '';
    } else if (type == 'word') {
      this.lesson.wordFilePath = '';
      this.lesson.wordFileName = '';
    }
    this.cd.detectChanges();
  }
}
