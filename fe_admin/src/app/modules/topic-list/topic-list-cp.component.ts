import { LessonService } from 'src/app/containers/services/lesson.service';
import { Component, OnInit, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { ProgramService } from 'src/app/containers/services/program.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslationService } from '../i18n/translation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topics.html',
  styleUrls: ['./topic.scss'],
})
export class TopicListCPComponent implements OnInit {
  @Output('description') description: any = new EventEmitter<any>();
  @Output('program') _program: any = new EventEmitter<any>();
  @Input() programId: any = 'programId';
  isShowSyllabusModal = false;
  closeResult: string;
  listPanelId: any = [''];
  panelId: any = [];
  program: any = {};
  lesson: any = {};
  sections: any = [];
  topics: any = [];
  constructor(
    private programService: ProgramService,
    private lessonService: LessonService,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private router: Router,
    private translationService: TranslationService
  ) {}
  ngOnInit(): void {
    this.lesson = {
      name: '',
    };
  }
  ngOnChanges(): void {
    if (this.programId > 0) {
      this.getProgramDetail();
    }
  }

  getProgramDetail = () => {
    this.programService
      .getItemById('programs', this.programId)
      .then((res: any) => {
        this.program = res;
        this.program.description = JSON.parse(res.description);
        this.description.emit({
          data: this.program.description,
        });
        this._program.emit({
          data: this.program,
        });
        this.topics = res.topics;
        let index = 0;
        this.topics.forEach((element) => {
          if (element.lessons.length > 0) {
            this.panelId.push('ngb-panel-' + index);
          }
          index++;
        });
        this.cd.detectChanges();
      })
      .catch((e) => {});
  };

  openSyllabusModal = (lesson: any) => {
    this.lessonService
      .getLessonSyllabusById(lesson.id, this.programId, lesson.topicId, this.translationService.getSelectedLanguage())
      .then((res: any) => {
        this.lesson = res;
        this.sections = res.sections;
        this.sections.forEach((section) => {
          section.activities.forEach((a) => {
            let teacherActivity = a.teacherActivity;
            let arr = teacherActivity.split('- ');
            let string = arr.join('<br>- ');
            a._teacherActivity = string.slice(4);
          });
        });
      })
      .catch((e: any) => {});
  };
  closeModalSyllabus = () => {
    this.isShowSyllabusModal = false;
  };
  syllabus = [
    {
      sectionIndex: 0,
      activityIndex: 0,
      name: '',
    },
  ];
  open(content: any, lesson: any) {
    this.modalService.open(content, {
      size: 'xl',
    });
    this.openSyllabusModal(lesson);
  }
  beforeChange = (event: any) => {
    if (this.listPanelId.find((e: any) => e == event.panelId)) {
      this.listPanelId = this.listPanelId.filter((e: any) => e != event.panelId);
    } else {
      this.listPanelId.push(event.panelId);
    }
    this.cd.detectChanges();
  };
  checkActive = (panel: any) => {
    return this.listPanelId.find((e: any) => e == panel);
  };
  printAssessment() {
    let DATA: any = document.getElementById('document-data-wraper');
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');
    mywindow.document.write('<html><title>' + document.title + '</title>');
    mywindow.document.write(`
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700%7CRoboto:300,400,500,600,700”
      rel=“stylesheet"
    />
    <style>
    .table th, .table td {
      padding: 0.75rem;
      vertical-align: top;
      border-top: 1px solid #EBEDF3;
    }
    thead tr,thead th {
      font-weight: 600;
      color: #888893 !important;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      text-align: left;
    }
    thead {display: table-header-group;}
    thead th, thead td {
			border-top: 0;
  	}
    table, th, td {
      border: 1px solid;
      border-collapse: collapse;
    }
    html, body{
      font-family: "Open Sans", sans-serif;
    }
    </style>`);
    mywindow.document.write('</head><body >');
    mywindow.document.write(DATA.innerHTML);
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    // mywindow.close();
  }
  openLesson(lessonId) {
    const url = this.router.serializeUrl(this.router.createUrlTree(['/lesson/' + lessonId]));

    window.open(url, '_blank');
  }
  download(type, lesson) {
    let url = '';
    if (type == 'pdf') {
      url = lesson.pdfFilePath;
    } else {
      url = lesson.wordFilePath;
    }
    window.open(url, '_blank');
  }
}
