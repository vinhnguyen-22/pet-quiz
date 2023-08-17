import { OnInit, Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from 'src/app/containers/constants';
import { ShareService } from 'src/app/containers/services/share/share.service';

@Component({
  selector: 'game-answeringAudio',
  templateUrl: './answeringAudio.html',
  styleUrls: ['../index.scss'],
})
export class AnsweringAudioComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() requestConfig: any;
  @Output() dataChanged = new EventEmitter<any>();
  configs: any = [];
  isCorrect = false;
  constructor(private shareService: ShareService, private cd: ChangeDetectorRef) {}
  ngOnInit(): void {
    if (this.data && this.data.length > 0) {
      this.configs = JSON.parse(this.data);
    } else {
      this.configs = {
        data: [
          {
            LinkAudio: '',
            KeyPass: '',
          },
        ],
      };
    }
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
        gameType: GAME_TYPE.answeringAudio,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.data.forEach((element) => {
      let urls = element.LinkAudio.split('/');
      assets.push(element.LinkAudio);
      element.LinkAudio = urls[urls.length - 1];
    });
    assets = assets.filter((item) => item);
    return { configs, assets };
  }

  setSrc($event: any, obj) {
    obj.LinkPhoto = $event;
  }

  uploadRecourse = (config, type: string) => {
    let inputTag = document.createElement('input');
    inputTag.type = 'file';
    if (type == 'image') {
      inputTag.accept = 'image/png, image/jpeg';
    } else if (type == 'audio') {
      inputTag.accept = 'audio/*';
    }
    let folderStore = FOLDER_STORE_RESOURCE_GAME.answeringAudio;
    inputTag.onchange = (_this: any) => {
      let files = _this.target.files;
      this.shareService
        .upload(files, folderStore, type)
        .then((res: any) => {
          if (type == 'audio') {
            config.LinkAudio = res.path;
          }
          this.cd.detectChanges();
        })
        .catch((e: any) => {});
    };
    inputTag.click();
  };

  addNewSection() {
    this.configs.data.push({
      LinkAudio: '',
      KeyPass: '',
    });
  }

  removeSection(index: number) {
    this.configs.splice(index, 1);
  }
}
