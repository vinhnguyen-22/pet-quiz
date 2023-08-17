import { environment } from '../../../../environments/environment';
import { OnInit, Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from 'src/app/containers/constants';
import { ShareService } from 'src/app/containers/services/share/share.service';

@Component({
  selector: 'game-unscrambleImage',
  templateUrl: './unscrambleImage.html',
  styleUrls: ['../index.scss'],
})
export class UnscrambleImageComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() requestConfig: any;
  @Output() dataChanged = new EventEmitter<any>();
  configs: any = [];
  folderStore = FOLDER_STORE_RESOURCE_GAME.unscrambleImage;
  constructor(private shareService: ShareService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.configs =
      this.data && this.data.length > 0
        ? JSON.parse(this.data)
        : [
            {
              ListImg: [
                { Link: '', Id: 1 },
                { Link: '', Id: 2 },
                { Link: '', Id: 3 },
              ],
              LinkAudio: '',
            },
          ];
  }

  ngOnChanges(): void {
    if (this.requestConfig) {
      let configGame = this.configs.map((x) => {
        let listImg = x.ListImg.map((y) => {
          return { ...y };
        });
        return { ...x, ListImg: listImg };
      });
      let data = this.convertDataOfflineMode(configGame);
      let configOfflineMode = JSON.stringify(data.configs);
      this.dataChanged.emit({
        configs: { offlineMode: configOfflineMode, onlineMode: this.configs, assets: JSON.stringify(data.assets) },
        gameType: GAME_TYPE.unscrambleImage,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.forEach((element) => {
      assets.push(element.LinkAudio);
      let url = element.LinkAudio.split('/');
      element.LinkAudio = url[url.length - 1];
      element.ListImg.forEach((item) => {
        assets.push(item.Link);
        let url = item.Link.split('/');
        item.Link = url[url.length - 1];
      });
    });
    assets = assets.filter((item) => item);
    return { configs, assets };
  }

  setSrc($event: any, obj) {
    obj.Link = $event;
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

  choiceAnswerType(typeNumber: number, config: any) {
    if (config.ListImg.length != typeNumber) {
      config.ListImg = [];
      for (let index = 1; index <= typeNumber; index++) {
        config.ListImg.push({ Link: '', Id: index });
      }
    }
  }

  addNewSection() {
    this.configs.push({
      ListImg: [
        { Link: '', Id: 1 },
        { Link: '', Id: 2 },
        { Link: '', Id: 3 },
      ],
      LinkAudio: '',
    });
  }

  removeSection(index: number) {
    this.configs.splice(index, 1);
  }
}
