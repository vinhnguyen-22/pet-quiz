import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HTTP_RESPONSE_TYPE } from 'src/app/containers/constants';
import { FormCanDeactivate } from 'src/app/containers/guards/can-deactivate/can-deactivate';
import { TopicSkillService } from 'src/app/containers/services/topic-skill.service';
import { TopicService } from 'src/app/containers/services/topic.service';
import { CommonModalComponent } from 'src/app/modules/SharedModule/modal/modal.component';

@Component({
  selector: 'app-topic-edit-evaluation-form',
  templateUrl: './topic-edit-evaluation-form.component.html',
  styleUrls: ['./topic-edit-evaluation-form.component.scss'],
})
export class TopicEditEvaluationFormComponent extends FormCanDeactivate implements OnInit {
  @ViewChild('confirmationModal')
  private modalComponent!: CommonModalComponent;

  isSubmitted: boolean;

  topicId: number;

  topic: any = {
    name: '',
  };

  activeTabId = 0;
  lessonPerWeek = [2, 3, 4, 5];

  // topicSkills: Array<any> = [];

  topicSkillModels = [
    {
      lessonPerWeek: 2,
      topicSkills: [this.getEmptyTopicSkill(2)]
    },
    {
      lessonPerWeek: 3,
      topicSkills: [this.getEmptyTopicSkill(3)]
    },
    {
      lessonPerWeek: 4,
      topicSkills: [this.getEmptyTopicSkill(4)]
    },
    {
      lessonPerWeek: 5,
      topicSkills: [this.getEmptyTopicSkill(5)]
    }
  ];

  constructor(
    private topicSkillsService: TopicSkillService,
    private topicService: TopicService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.topicId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadTopic();
    this.loadTopicSkill();
  }

  loadTopic() {
    this.topicService
      .getItemById('topics', this.topicId)
      .then((res: any) => {
        this.topic = res;
        this.cd.detectChanges();
      })
      .catch((e) => {});
  }

  loadTopicSkill() {
    this.topicSkillsService
      .getByTopicId(this.topicId)
      .then((res: any) => {
        if (!res || res.length == 0) {
          this.topicSkillModels = [
            {
              lessonPerWeek: 2,
              topicSkills: [this.getEmptyTopicSkill(2)]
            },
            {
              lessonPerWeek: 3,
              topicSkills: [this.getEmptyTopicSkill(3)]
            },
            {
              lessonPerWeek: 4,
              topicSkills: [this.getEmptyTopicSkill(4)]
            },
            {
              lessonPerWeek: 5,
              topicSkills: [this.getEmptyTopicSkill(5)]
            }
          ];
        } else {
          this.topicSkillModels = res;
        }

        this.cd.detectChanges();
      })
      .catch((e) => {});
  }

  changeTopicSkillValue(lessonPerWeek, i, $event) {
    let skillName = $event.target.value;
    var tsModel = this.topicSkillModels.find(x => x.lessonPerWeek == lessonPerWeek);
    if (tsModel) {
      tsModel.topicSkills[i].skillName = skillName;
    }
  }

  addSkill(lessonPerWeek) {    
    var tsModel = this.topicSkillModels.find(x => x.lessonPerWeek == lessonPerWeek);
    if (tsModel) {
      var emptyTopicSkill = this.getEmptyTopicSkill(lessonPerWeek);
      tsModel.topicSkills.push(emptyTopicSkill);
    }
    this.cd.detectChanges();
  }

  getEmptyTopicSkill(lessonPerWeek) {
    return {
      id: 0,
      skillName: '',
      topicId: this.topicId,
      orderId: 0,
      lessonPerWeek: lessonPerWeek
    };
  }

  saveTopicEvaluationForm() {
    this.isSubmitted = true;
    
    var topicSkills = [];
    for (let i = 0; i < this.lessonPerWeek.length; i++) {
      var lpw = this.lessonPerWeek[i];
      var topicSkillModel = this.topicSkillModels.find(x => x.lessonPerWeek == lpw);
      if (topicSkillModel) {
        for (let j = topicSkillModel.topicSkills.length - 1; j >= 0; j--) {
          var topicSkill = topicSkillModel.topicSkills[j];
          if (!topicSkill.skillName || topicSkill.skillName === '') {
            topicSkillModel.topicSkills.splice(j, 1);
          } else {
            topicSkill.orderId = j;
            topicSkills.push(topicSkill);
          }
        }
      }
    }

    var param = {
      topicId: this.topicId,
      topicSkills: topicSkills
    }

    this.topicSkillsService
      .update(param)
      .then((res: any) => {
        if (!res) {
          return;
        }

        if (res.status === HTTP_RESPONSE_TYPE.SUCCESS) {
          this.router.navigate(['/topics']);
          this.toastr.success('', 'Sửa phiếu đánh giá thành công.');
        } else {
          this.toastr.error('', res.message);
        }
      })
      .catch((e) => {});
  }

  removeSkill(lessonPerWeek, skillIndex) {
    var values = {
      lessonPerWeek,
      skillIndex: skillIndex,
    };

    var tsModel = this.topicSkillModels.find(x => x.lessonPerWeek == lessonPerWeek);
    if (tsModel) {
      var skill = tsModel.topicSkills[skillIndex];
      let title = 'Xác nhận xoá';
      let text = 'Bạn có chắc chắn muốn xoá kỹ năng "' + skill.skillName + '" không?';

      this.openModal(values, title, text);
    }
  }

  async openModal(values, title: string, text: string) {
    return await this.modalComponent.openDeleteConfirmationModal(values, title, text);
  }

  getConfirmationValue($event: any) {
    let returnData = $event;
    if (returnData.result == 'Confirm') {
      let skillIndex = returnData.values.skillIndex;
      let lessonPerWeek = returnData.values.lessonPerWeek;
      var tsModel = this.topicSkillModels.find(x => x.lessonPerWeek == lessonPerWeek);
      if (tsModel) {
        tsModel.topicSkills.splice(skillIndex, 1);
      }      
    }
  }

  getActiveTabCSSClass(tabIndex) {
    if (tabIndex !== this.activeTabId) {
      return '';
    }

    return 'active';
  }

  setActiveTab(tabIndex) {
    this.activeTabId = tabIndex;
    this.cd.detectChanges();
  }
}
