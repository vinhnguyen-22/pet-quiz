import { environment } from './../../../../environments/environment';

import { OnInit, Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from 'src/app/containers/constants';
@Component({
  selector: 'game-flashcard1',
  templateUrl: './flashcard1.html',
  styleUrls: ['../index.scss'],
})
export class FlashCard1Component implements OnInit, OnChanges {
  @Input() data: any;
  @Input() requestConfig: any;
  @Input() index: any;
  @Output() dataChanged = new EventEmitter<any>();
  configs: any = [];
  folderStore = FOLDER_STORE_RESOURCE_GAME.flashcard1;
  constructor(private shareService: ShareService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.configs =
      this.data && this.data.length > 0
        ? JSON.parse(this.data)
        : [
            {
              Name: '',
              LinkImg: '',
              LinkAudio: '',
              Key: '',
              NameImg: '',
              NameAudio: '',
            },
          ];
  }

  ngOnChanges(): void {
    if (this.requestConfig) {
      let configGame = this.configs.map((x) => {
        return { ...x };
      });
      let data = this.convertDataOfflineMode(configGame);
      let configOfflineMode = JSON.stringify(data.configs);
      this.dataChanged.emit({
        configs: { offlineMode: configOfflineMode, onlineMode: this.configs, assets: JSON.stringify(data.assets) },
        gameType: GAME_TYPE.flashcard1,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.forEach((element) => {
      assets.push(element.LinkAudio);
      assets.push(element.LinkImg);
      let urlAudio = element.LinkAudio.split('/');
      let urlImg = element.LinkImg.split('/');
      element.LinkAudio = urlAudio[urlAudio.length - 1];
      element.LinkImg = urlImg[urlImg.length - 1];
    });
    assets = assets.filter((item) => item);
    return { configs, assets };
  }

  setSrc($event: any, data) {
    data.LinkImg = $event;
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
            this.configs[index].LinkAudio = res.path;
            this.cd.detectChanges();
          }
        })
        .catch((e: any) => {});
    };
    inputTag.click();
  };
  addNewSection() {
    this.configs.push({
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
