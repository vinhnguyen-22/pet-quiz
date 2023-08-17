import { environment } from '../../../../environments/environment';

import { OnInit, Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from 'src/app/containers/constants';
@Component({
  selector: 'game-drawing',
  templateUrl: './drawing.html',
  styleUrls: ['../index.scss'],
})
export class DrawingComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() requestConfig: any;
  @Input() index: any;
  @Output() dataChanged = new EventEmitter<any>();
  configs: any = [];
  folderStore = FOLDER_STORE_RESOURCE_GAME.drawing;

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
        gameType: GAME_TYPE.drawing,
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

  setSrc($event: any, data) {
    data.LinkPhoto = $event;
  }

  uploadRecourse = (objData, type: string) => {
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
            objData.LinkAudio = res.path;
            this.cd.detectChanges();
          }
        })
        .catch((e: any) => {});
    };
    inputTag.click();
  };
  addNewSection() {
    this.configs.data.push({
      LinkPhoto: '',
      LinkAudio: '',
    });
  }

  removeSection(index: number) {
    this.configs.splice(index, 1);
  }
}
