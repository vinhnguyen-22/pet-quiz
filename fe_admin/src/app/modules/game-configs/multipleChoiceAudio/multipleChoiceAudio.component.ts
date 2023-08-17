import { environment } from '../../../../environments/environment';

import { OnInit, Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from 'src/app/containers/constants';

@Component({
  selector: 'game-multipleChoiceAudio',
  templateUrl: './multipleChoiceAudio.html',
  styleUrls: ['../index.scss'],
})
export class MultipleChoiceAudioComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() requestConfig: any;
  @Input() index: any;
  @Output() dataChanged = new EventEmitter<any>();
  configs: any = [];
  folderStore = FOLDER_STORE_RESOURCE_GAME.multipleChoicesAudio;

  constructor(private shareService: ShareService, private cd: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.configs = this.data && this.data.length > 0 ? JSON.parse(this.data) : [this.getNewSection()];
  }

  ngOnChanges(): void {
    if (this.requestConfig) {
      let configGame = this.configs.map((x) => {
        let DataItem = x.DataItem.map((y) => {
          return { ...y };
        });
        return { ...x, DataItem };
      });

      let data = this.convertDataOfflineMode(configGame);
      let configOfflineMode = JSON.stringify(data.configs);
      this.dataChanged.emit({
        configs: { offlineMode: configOfflineMode, onlineMode: this.configs, assets: JSON.stringify(data.assets) },
        gameType: GAME_TYPE.multipleChoiceAudio,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.forEach((element) => {
      assets.push(element.LinkAudio);
      let urlAudio = element.LinkAudio.split('/');
      element.LinkAudio = urlAudio[urlAudio.length - 1];
      element.DataItem.forEach((item) => {
        assets.push(item.LinkImg);
        let urlPhoto = item.LinkImg.split('/');
        item.LinkImg = urlPhoto[urlPhoto.length - 1];
      });
    });
    assets = assets.filter((item) => item);
    return { configs, assets };
  }

  uploadRecourse = (config, type: string) => {
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
          config.LinkAudio = res.path;
          this.cd.detectChanges();
        })
        .catch((e: any) => {});
    };
    inputTag.click();
  };

  getNewSection() {
    let model: any = {
      DataItem: [
        {
          Name: '',
          LinkImg: '',
          Key: '1',
        },
        {
          Name: '',
          LinkImg: '',
          Key: '2',
        },
      ],
      KeyPass: '',
      LinkAudio: '',
    };
    return model;
  }

  addNewSection() {
    let sectionList = [...this.configs];
    sectionList.push(this.getNewSection());
    this.configs = sectionList;
  }

  setSrc($event: any, dataItem) {
    dataItem.LinkImg = $event;
  }

  choiceAnswerType(typeNumber: number, config: any) {
    if (config.DataItem.length != typeNumber) {
      config.DataItem = [];
      for (let index = 1; index <= typeNumber; index++) {
        config.DataItem.push({
          Name: '',
          LinkImg: '',
          Key: index + '',
        });
      }
    }
  }

  setCorrectAnswer(config, dataItem, index) {
    config.KeyPass = index + '';
    dataItem.Key = index + '';
    dataItem.Name = '';
  }

  removeSection(index: number) {
    this.configs.splice(index, 1);
  }
}
