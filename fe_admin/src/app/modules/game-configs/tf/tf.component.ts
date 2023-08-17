import { environment } from './../../../../environments/environment';

import { OnInit, Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from 'src/app/containers/constants';
import { ShareService } from 'src/app/containers/services/share/share.service';

@Component({
  selector: 'game-tf',
  templateUrl: './tf.html',
  styleUrls: ['../index.scss'],
})
export class TfComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() requestConfig: any;
  @Output() dataChanged = new EventEmitter<any>();
  configs: any = [];
  folderStore = FOLDER_STORE_RESOURCE_GAME.tf;
  constructor(private shareService: ShareService, private cd: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.configs =
      this.data && this.data.length > 0
        ? JSON.parse(this.data)
        : {
            data: [
              {
                LinkImg: '',
                LinkAudio: '',
                TrueOrFalse: 'false',
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
        gameType: GAME_TYPE.tf,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.data.forEach((item) => {
      assets.push(item.LinkImg);
      assets.push(item.LinkAudio);

      let urlImg = item.LinkImg.split('/');
      item.LinkImg = urlImg[urlImg.length - 1];

      let urlAudio = item.LinkAudio.split('/');
      item.LinkAudio = urlAudio[urlAudio.length - 1];
    });
    assets = assets.filter((item) => item);
    return { configs, assets };
  }

  setSrc($event: any, config) {
    config.LinkImg = $event;
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
          if (type == 'audio') {
            this.configs.data[index].LinkAudio = res.path;
          }
          this.cd.detectChanges();
        })
        .catch((e: any) => {});
    };
    inputTag.click();
  };

  setCorrect(isCorrect: boolean, config) {
    config.TrueOrFalse = isCorrect + '';
  }
  addNewSection() {
    this.configs.data.push({
      LinkImg: '',
      LinkAudio: '',
      TrueOrFalse: 'false',
    });
  }

  removeSection(index: number) {
    this.configs.data.splice(index, 1);
  }
}
