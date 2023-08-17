import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
} from 'ng-apexcharts';
import { StatisticalService } from 'src/app/containers/services/statistical.service';
import { VIETEC_ID, SCHOOL_TYPE } from 'src/app/containers/constants';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { Router } from '@angular/router';
import { NewService } from 'src/app/containers/services/new.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalService } from 'src/app/containers/services/modal.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};
@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.scss'],
})
export class StatisticalComponent {
  @Input() cssClass;
  @ViewChild('chart') chart: ChartComponent;
  @ViewChild('Top') Top: any;
  public chartOptions: Partial<ChartOptions>;
  isGetDataSuccess: boolean;
  news: any = [];
  new: any = {};

  provinceRankings = [];
  programRankings = [];
  schoolRankings = [];
  classesRankings = [];
  statisticals = [];
  currentUser: any = {};
  studentDatas: any = {};
  links: any = [];
  isVietec = true;
  isSchool = false;
  titleStatisticals: any = [
    {
      key: 'CENTER',
      title: 'Trung tâm Tiếng Anh',
    },
    {
      key: 'SCHOOL',
      title: 'Trường học',
    },
    {
      key: 'CLASS',
      title: 'Lớp học',
    },
    {
      key: 'TEACHER',
      title: 'Giáo viên giảng dạy',
    },
    {
      key: 'STUDENT',
      title: 'Học sinh',
    },
  ];
  svg = [];
  titleStatistical = 1;
  constructor(
    private statisticalService: StatisticalService,
    public modalService: NgbModal,
    private cd: ChangeDetectorRef,
    private auth: AuthService,
    public router: Router,
    public modal: CustomModalService,
    private newService: NewService
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {},
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + ' học sinh';
          },
        },
      },
    };
    this.currentUser = this.auth.currentUserValue;
    if (this.currentUser.organization.id != VIETEC_ID) {
    }
    this.isVietec = this.currentUser.organization.id == VIETEC_ID;
    let filterValue = '';
    if (this.isVietec) {
      filterValue = 'VIETEC';
      this.svg = [
        './assets/icon/center.svg',
        './assets/icon/school.svg',
        './assets/icon/class.svg',
        './assets/icon/teacher.svg',
        './assets/icon/student.svg',
      ];
      this.links = ['centers', 'schools'];
    } else if (this.currentUser.organization.type == SCHOOL_TYPE) {
      this.isSchool = true;
      this.svg = ['./assets/icon/class.svg', './assets/icon/teacher.svg', './assets/icon/student.svg'];
      this.links = ['center-management/classes', 'center-management/teachers', ''];
      filterValue = 'SCHOOL';
      this.getNews();
    } else {
      this.svg = ['./assets/icon/school.svg', './assets/icon/class.svg', './assets/icon/teacher.svg', './assets/icon/student.svg'];
      this.links = ['center-management/schools', 'center-management/classes', 'center-management/teachers', ''];
      filterValue = 'CENTER';
    }

    this.getStatisticals(filterValue);
  }
  ngAfterViewChecked(): void {
    let body = document.getElementById('kt_content');
    body.style.height = 'calc(100vh - 65px)';
    this.cd.detectChanges();
  }
  ngOnDestroy(): void {
    let body = document.getElementById('kt_content');
    body.style.height = '';
    this.cd.detectChanges();
  }
  getNews = () => {
    let params = {
      page: 1,
      pageSize: 1000,
    };

    this.newService
      .getNewsForCurrentUser(params)
      .then((res: any) => {
        this.news = res.datas;
        this.cd.detectChanges();
      })
      .catch((e) => {});
  };
  openModal(obj) {
    this.modal.Dialog('new', true, obj);
    this.new = obj;
  }
  getStatisticals(type) {
    this.statisticalService
      .getByModel({ type: type, id: this.currentUser.organization.id })
      .then((res: any) => {
        this.provinceRankings = res.provinceRankings;
        this.statisticals = res.statisticals;
        this.statisticals.reverse();
        this.programRankings = res.programRankings;
        this.studentDatas = res.studentDatas;
        this.chartOptions.xaxis.categories = this.studentDatas.categories;
        this.chartOptions.series = this.studentDatas.dataChart;
        this.schoolRankings = res.schoolRankings;
        this.classesRankings = res.classesRankings;
        let heightChart = document.querySelector('.statistical-program');
        this.chartOptions.chart.height = heightChart.clientHeight - 40;
        this.isGetDataSuccess = true;
        this.cd.detectChanges();
      })
      .catch((e) => {});
  }
  getProvinceRank(type: string) {
    this.statisticalService
      .getProvinceRank(type)
      .then((res: any) => {
        this.provinceRankings = res;
        this.cd.detectChanges();
      })
      .catch((e) => {});
  }
  changeFilter(event: any) {
    this.getProvinceRank(event.target.value);
  }
  viewDetail = (link: any) => {
    if (!link) return;
    this.router.navigate([link]);
  };
}
