import { AKITA_STORE } from './../../../containers/constants/index';
import { Component, ChangeDetectorRef } from '@angular/core';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { TopicService } from 'src/app/containers/services/topic.service';

@Component({
  selector: 'topic-list',
  templateUrl: './list.component.html',
})
export class TopicListComponent {
  grades: Array<any> = [];
  API_ENDPOINT = 'topics';
  filter = {
    searchTerm: '',
    gradeId: '0',
  };
  topics: any = [];
  headers = [
    {
      key: 'gradeName',
      value: 'Level',
      width: '15%',
    },
    {
      key: 'name',
      value: 'Tên chủ đề',
      width: '15%',
    },
    {
      key: 'createdDate',
      value: 'Ngày tạo',
      width: '10%',
    },
  ];

  constructor(private optionQuery: OptionQuery, public topicService: TopicService, private cd: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.loadOption();
    this.getTopics();
  }

  loadOption() {
    let options$ = this.optionQuery.selectAll();
    options$.subscribe((options) => {
      this.setInitialValues(options);
    });
  }
  setInitialValues = (options: any) => {
    if (options.length > 0) {
      this.grades = options[AKITA_STORE.GRADE];
    }
  };
  getTopics = () => {
    this.topicService
      .getByModel(this.API_ENDPOINT, this.filter)
      .then((res: any) => {
        this.topics = res;
        this.cd.detectChanges();
      })
      .catch((e) => {});
  };

  changeFilter = () => {
    this.getTopics();
  };
}
