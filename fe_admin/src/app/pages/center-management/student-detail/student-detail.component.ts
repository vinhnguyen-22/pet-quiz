import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StudentService } from 'src/app/containers/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.html',
})
export class StudentDetailComponent implements OnInit {
  activeTabId = 1;
  studentId = 0;
  studentDetail: any = {};
  classId: any;
  constructor(private studentService: StudentService, private router: Router, private actRoute: ActivatedRoute, private cd: ChangeDetectorRef) {
    this.studentId = this.actRoute.snapshot.params['id'];
    this.classId = this.router.getCurrentNavigation().extras?.state?.classId;
  }
  ngOnInit(): void {
    this.showStudentDetail();
  }
  setActiveTab(tabId: number) {
    this.activeTabId = tabId;
  }

  getActiveTabCSSClass(tabId: number) {
    if (tabId !== this.activeTabId) {
      return '';
    }
    return 'active';
  }
  showStudentDetail() {
    this.studentService
      .getStudentById(this.studentId)
      .then((res: any) => {
        this.studentDetail = res;
        this.cd.detectChanges();
      })
      .catch((e) => {});
  }
  returnClass = () => {
    if (this.classId) {
      let url = '/center-management/classes/detail/' + this.classId;
      this.router.navigateByUrl(url, {});
    } else {
      this.router.navigate(['/classes']);
    }
  };
}
