import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';

import { FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from '../../../containers/constants/index';
import { OnInit, Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ShareService } from 'src/app/containers/services/share/share.service';

@Component({
  selector: 'game-flashcard2',
  templateUrl: './flashcard2.html',
  styleUrls: ['../index.scss'],
})
export class Flashcard2Component implements OnInit, OnChanges {
  @Input() data: any;
  @Input() requestConfig: any;
  @Input() index: any;
  @Output() dataChanged = new EventEmitter<any>();
  configs: any = [];
  answerNumber: number = 2;
  folderStore = FOLDER_STORE_RESOURCE_GAME.flashcard2;

  constructor(private shareService: ShareService, private cd: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.configs = this.data && this.data.length > 0 ? JSON.parse(this.data) : [this.getNewSection()];
  }

  ngOnChanges(): void {
    if (this.requestConfig) {
      let configGame = this.configs.map((x) => {
        let dataSpin = x.DataSpin.map((y) => {
          return { ...y };
        });
        return { ...x, DataSpin: dataSpin };
      });
      let data = this.convertDataOfflineMode(configGame);
      let configOfflineMode = JSON.stringify(data.configs);
      this.dataChanged.emit({
        configs: { offlineMode: configOfflineMode, onlineMode: this.configs, assets: JSON.stringify(data.assets) },
        gameType: GAME_TYPE.flashcard2,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.forEach((element) => {
      element.DataSpin.forEach((item) => {
        assets.push(item.LinkAudio);
        assets.push(item.LinkImg);
        let urlAudio = item.LinkAudio.split('/');
        let urlImg = item.LinkImg.split('/');
        item.LinkAudio = urlAudio[urlAudio.length - 1];
        item.LinkImg = urlImg[urlImg.length - 1];
      });
    });
    assets = assets.filter((item) => item);
    return { configs, assets };
  }

  // 1=6, 2=5, 3 = 4, 4 = 3
  getNewSection() {
    let model: any = {
      DataSpin: [
        {
          Name: '',
          LinkAudio: '',
          LinkImg: '',
        },
        {
          Name: '',
          LinkAudio: '',
          LinkImg: '',
        },
        {
          Name: '',
          LinkAudio: '',
          LinkImg: '',
        },
        {
          Name: '',
          LinkAudio: '',
          LinkImg: '',
        },
      ],
      Type: 3,
    };
    return model;
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
    sectionList.push(this.getNewSection());
    this.configs = sectionList;
  }

  setSrc($event: any, dataSpin) {
    dataSpin.LinkImg = $event;
  }
  // 1=6, 2=5, 3 = 4, 4 = 3
  choiceImageNumber(typeNumber: number, config: any) {
    if (config.Type != typeNumber) {
      config.DataSpin = [];
      let imageNumber = 6;
      if (typeNumber == 2) {
        imageNumber = 5;
      } else if (typeNumber == 3) {
        imageNumber = 4;
      } else if (typeNumber == 1) {
        imageNumber = 6;
      }
      for (let index = 0; index < imageNumber; index++) {
        config.DataSpin.push({
          Name: '',
          LinkAudio: '',
          LinkImg: '',
        });
      }
      config.Type = typeNumber;
    }
  }

  removeSection(index: number) {
    this.configs.splice(index, 1);
  }
}
