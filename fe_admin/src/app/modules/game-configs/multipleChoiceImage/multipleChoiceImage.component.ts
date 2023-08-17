import { environment } from '../../../../environments/environment';

import { OnInit, Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from 'src/app/containers/constants';

@Component({
  selector: 'game-multipleChoiceImage',
  templateUrl: './multipleChoiceImage.html',
  styleUrls: ['../index.scss'],
})
export class MultipleChoiceImageComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() requestConfig: any;
  @Input() index: any;
  @Output() dataChanged = new EventEmitter<any>();
  configs: any = [];
  answerNumber: number = 2;
  folderStore = FOLDER_STORE_RESOURCE_GAME.multipleChoicesImage;
  constructor(private shareService: ShareService, private cd: ChangeDetectorRef) {}
  ngOnInit(): void {
    let obj = this.data && this.data.length > 0 ? JSON.parse(this.data) : { data: [this.getNewSection()] };
    this.configs = obj.data;
  }

  ngOnChanges(): void {
    if (this.requestConfig) {
      let configGame = this.configs.map((x) => {
        return { ...x };
      });
      let data = this.convertDataOfflineMode(configGame);
      let configOfflineMode = JSON.stringify({ data: data.configs });
      this.dataChanged.emit({
        configs: { offlineMode: configOfflineMode, onlineMode: this.configs, assets: JSON.stringify(data.assets) },
        gameType: GAME_TYPE.multipleChoiceImage,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.forEach((element) => {
      assets.push(element.LinkAudio);
      assets.push(element.LinkImg);
      let urlAudio = element.LinkAudio.split('/');
      element.LinkAudio = urlAudio[urlAudio.length - 1];

      let urlImg = element.LinkImg.split('/');
      element.LinkImg = urlImg[urlImg.length - 1];
    });
    assets = assets.filter((item) => item);
    return { configs, assets };
  }

  uploadRecourse = (index: number, type: string) => {
    let inputTag = document.createElement('input');
    inputTag.type = 'file';
    if (type == 'image') {
      inputTag.accept = 'image/png, image/jpeg';
    } else if (type == 'audio') {
      inputTag.accept = 'audio/*';
    }
    inputTag.onchange = (_this: any) => {
      let files = _this.target.files;
      this.shareService
        .upload(files, this.folderStore, type)
        .then((res: any) => {
          let audioUrlItems = res.path.split('/');
          this.configs[index].NameAudio = audioUrlItems[audioUrlItems.length - 1];
          this.configs[index].LinkAudio = res.path;
          this.cd.detectChanges();
        })
        .catch((e: any) => {});
    };
    inputTag.click();
  };

  getNewSection() {
    let model: any = {
      LinkImg: '',
      LinkAudio: '',
      ListButton: [
        {
          Text: '',
        },
        {
          Text: '',
        },
      ],
      answerNumber: 2,
      KeyPass: '',
    };
    return model;
  }

  addNewSection() {
    let sectionList = [...this.configs];
    sectionList.push(this.getNewSection());
    this.configs = sectionList;
  }

  setSrc($event: any, index: number) {
    this.configs[index].LinkImg = $event;
  }

  choiceAnswerType(typeNumber: number, index: number) {
    if (this.configs[index].answerNumber != typeNumber) {
      this.answerNumber = typeNumber;
      let answers = [];
      let config = {};
      for (let index = 0; index < typeNumber; index++) {
        answers.push({ Text: '' });
      }
      this.configs[index].answerNumber = typeNumber;
      config = { ...this.configs[index] };
      config['ListButton'] = [...answers];
      this.configs[index] = config;
    }
  }

  choiceAnswerCorrect(i, j) {
    this.configs[i].KeyPass = this.configs[i].ListButton[j].Text;
  }

  removeSection(index: number) {
    this.configs.splice(index, 1);
  }
}
