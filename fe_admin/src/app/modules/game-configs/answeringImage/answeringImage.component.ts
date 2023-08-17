import { OnInit, Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from 'src/app/containers/constants';
import { ShareService } from 'src/app/containers/services/share/share.service';

@Component({
  selector: 'game-answeringImage',
  templateUrl: './answeringImage.html',
  styleUrls: ['../index.scss'],
})
export class AnsweringImageComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() requestConfig: any;
  @Output() dataChanged = new EventEmitter<any>();
  configs: any = [];
  isCorrect = false;
  folderStore = FOLDER_STORE_RESOURCE_GAME.answeringImage;
  constructor(private shareService: ShareService, private cd: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.configs =
      this.data && this.data.length > 0
        ? JSON.parse(this.data)
        : {
            data: [
              {
                LinkPhoto: '',
                LinkAudio: '',
                KeyPass: '',
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
        gameType: GAME_TYPE.answeringImage,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.data.forEach((element) => {
      assets.push(element.LinkAudio);
      assets.push(element.LinkPhoto);
      let urlAudio = element.LinkAudio.split('/');
      let urlPhotos = element.LinkPhoto.split('/');
      element.LinkPhoto = urlPhotos[urlPhotos.length - 1];
      element.LinkAudio = urlAudio[urlAudio.length - 1];
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
    inputTag.onchange = (_this: any) => {
      let files = _this.target.files;
      this.shareService
        .upload(files, this.folderStore, type)
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
      LinkPhoto: '',
      LinkAudio: '',
      KeyPass: '',
    });
  }

  removeSection(index: number) {
    this.configs.splice(index, 1);
  }
}
