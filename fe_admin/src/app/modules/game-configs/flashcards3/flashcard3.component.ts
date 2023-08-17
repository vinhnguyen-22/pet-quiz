import { environment } from '../../../../environments/environment';

import { OnInit, Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from 'src/app/containers/constants';
@Component({
  selector: 'game-flashcard3',
  templateUrl: './flashcard3.html',
  styleUrls: ['../index.scss'],
})
export class FlashCard3Component implements OnInit, OnChanges {
  @Input() data: any;
  @Input() requestConfig: any;
  @Input() index: any;
  @Output() dataChanged = new EventEmitter<any>();
  configs: any = [];
  folderStore = FOLDER_STORE_RESOURCE_GAME.flashcard3;
  constructor(private shareService: ShareService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.configs =
      this.data && this.data.length > 0
        ? JSON.parse(this.data)
        : {
            data: [
              {
                Name: '',
                LinkImg: '',
                LinkAudio: '',
                Key: '',
              },
            ],
          };
  }

  ngOnChanges(): void {
    if (this.requestConfig) {
      let configGame = {
        data: [],
      };
      configGame.data = this.configs.data.map((x) => {
        return { ...x };
      });
      let data = this.convertDataOfflineMode(configGame);
      let configOfflineMode = JSON.stringify(data.configs);
      this.dataChanged.emit({
        configs: { offlineMode: configOfflineMode, onlineMode: this.configs, assets: JSON.stringify(data.assets) },
        gameType: GAME_TYPE.flashcard3,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.data.forEach((item) => {
      assets.push(item.LinkAudio);
      assets.push(item.LinkImg);
      let urlAudio = item.LinkAudio.split('/');
      let urlImg = item.LinkImg.split('/');
      item.LinkAudio = urlAudio[urlAudio.length - 1];
      item.LinkImg = urlImg[urlImg.length - 1];
    });
    assets = assets.filter((item) => item);
    return { configs, assets };
  }

  setSrc($event: any, data) {
    data.LinkImg = $event;
  }

  uploadRecourse = (config: any, type: string) => {
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
          if (type == 'audio') {
            config.LinkAudio = res.path;
            this.cd.detectChanges();
          }
        })
        .catch((e: any) => {});
    };
    inputTag.click();
  };
  addNewSection() {
    this.configs.data.push({
      Name: '',
      LinkImg: '',
      LinkAudio: '',
      Key: '',
    });
  }

  removeSection(index: number) {
    this.configs.splice(index, 1);
  }
}
