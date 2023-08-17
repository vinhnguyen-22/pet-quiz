import { environment } from './../../../../environments/environment';

import { FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from '../../../containers/constants/index';
import { OnInit, Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ShareService } from 'src/app/containers/services/share/share.service';

@Component({
  selector: 'game-flashcard5',
  templateUrl: './flashcard5.html',
  styleUrls: ['../index.scss'],
})
export class Flashcard5Component implements OnInit, OnChanges {
  OBJECT_ITEM = {
    LinkImg: '',
    LinkAudio: '',
    Text: '',
  };
  folderStore = FOLDER_STORE_RESOURCE_GAME.flashcard5;

  @Input() data: any;
  @Input() requestConfig: any;
  @Input() index: any;
  @Output() dataChanged = new EventEmitter<any>();
  configs: any = [];
  answerNumber: number = 2;

  constructor(private shareService: ShareService, private cd: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.configs = this.data && this.data.length > 0 ? JSON.parse(this.data) : [this.getSectionEmpty()];
  }

  ngOnChanges(): void {
    if (this.requestConfig) {
      let configGame = this.configs.map((x) => {
        let dataItem = x.DataItem.map((y) => {
          return { ...y };
        });
        return { ...x, DataItem: dataItem };
      });
      let data = this.convertDataOfflineMode(configGame);
      let configOfflineMode = JSON.stringify(data.configs);
      this.dataChanged.emit({
        configs: { offlineMode: configOfflineMode, onlineMode: this.configs, assets: JSON.stringify(data.assets) },
        gameType: GAME_TYPE.flashcard5,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.forEach((element) => {
      element.DataItem.map((item) => {
        assets.push(item.LinkAudio);
        assets.push(item.LinkImg);
        let urlAudio = item.LinkAudio.split('/');
        let urlPhoto = item.LinkImg.split('/');
        item.LinkAudio = urlAudio[urlAudio.length - 1];
        item.LinkImg = urlPhoto[urlPhoto.length - 1];
      });
    });
    assets = assets.filter((item) => item);
    return { configs, assets };
  }

  uploadRecourse = (dataSpin, type: string) => {
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
          dataSpin.LinkAudio = res.path;
          this.cd.detectChanges();
        })
        .catch((e: any) => {});
    };
    inputTag.click();
  };

  addNewSection() {
    let sectionList = [...this.configs];
    sectionList.push(this.getSectionEmpty());
    this.configs = sectionList;
  }

  getSectionEmpty() {
    let model = {
      DataItem: [
        {
          LinkImg: '',
          LinkAudio: '',
          Text: '',
        },
        {
          LinkImg: '',
          LinkAudio: '',
          Text: '',
        },
      ],
    };
    return model;
  }
  setSrc($event: any, dataSpin) {
    dataSpin.LinkImg = $event;
  }

  choiceImageNumber(typeNumber: number, config: any) {
    if (config.Type != typeNumber) {
      config.DataItem = [];
      for (let index = 0; index < typeNumber; index++) {
        config.DataItem.push({ ...this.OBJECT_ITEM });
      }
    }
  }

  removeSection(index: number) {
    this.configs.splice(index, 1);
  }
}
