import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.scss'],
})
export class ProgramDetailComponent implements OnInit {
  description: any = {};
  programId: number = 0;
  program: any = {};
  descriptionTypes = [
    { index: 0, label: 'Mục tiêu chương trình', key: 'target', value: '' },
    { index: 1, label: 'Kĩ năng ngôn ngữ (nghe)', key: 'listening', value: '' },
    { index: 2, label: 'Kĩ năng ngôn ngữ (nói)', key: 'speaking', value: '' },
    { index: 3, label: 'Kĩ năng ngôn ngữ (đọc)', key: 'reading', value: '' },
    { index: 4, label: 'Kĩ năng ngôn ngữ (viết)', key: 'writing', value: '' },
    { index: 5, label: 'Kiến thức ngôn ngữ', key: 'language', value: '' },
    { index: 5, label: 'Kĩ năng khác', key: 'other', value: '' },
  ];
  constructor(
    private actRoute: ActivatedRoute,
    private modalService: NgbModal,
    private cd: ChangeDetectorRef
  ) {
    this.programId = this.actRoute.snapshot.params['id'];
  }

  ngOnInit(): void {}
  open(content: any) {
    this.modalService.open(content, {
      size: 'xl',
    });
    this.showDescription();
  }
  showDescription = () => {
    this.getDescriptionType();
  };
  getDescriptionType() {
    this.descriptionTypes = this.descriptionTypes.map((desc: any) => {
      return {
        ...desc,
        value: this.description[desc.key],
      };
    });
    this.cd.detectChanges();
  }
  getDesc = (event: any) => {
    this.description = event.data;
  };
  setProgram = (event: any) => {
    this.program = event.data;
  };
}
