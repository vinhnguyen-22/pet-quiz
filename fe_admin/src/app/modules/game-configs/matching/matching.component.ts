import { environment } from './../../../../environments/environment';
import { FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from './../../../containers/constants/index';
import { OnInit, Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'game-matching',
  templateUrl: './matching.html',
  styleUrls: ['../index.scss', './matching.scss'],
})
export class MatchingComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() requestConfig: any;
  @Output() dataChanged = new EventEmitter<any>();
  FOLDER_STORE_RESOURCE_GAME = FOLDER_STORE_RESOURCE_GAME;

  configs: any = [];
  activePane = 0;
  imageSelected = '';
  public panes = [
    { name: '2 ảnh', value: '2' },
    { name: '3 ảnh', value: '3' },
    { name: '4 ảnh', value: '4' },
    { name: '5 ảnh', value: '5' },
  ];
  constructor(private shareService: ShareService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.configs = this.data && this.data.length > 0 ? JSON.parse(this.data) : [this.getNewSection()];
  }

  ngOnChanges(): void {
    if (this.requestConfig) {
      let configGame = this.configs.map((x) => {
        let dataItemTop = x.DataItemTop.map((y) => {
          return { ...y };
        });
        let dataItemBottom = x.DataItemBottom.map((y) => {
          return { ...y };
        });
        return { ...x, DataItemTop: dataItemTop, DataItemBottom: dataItemBottom };
      });
      let data = this.convertDataOfflineMode(configGame);
      let configOfflineMode = JSON.stringify(data.configs);
      this.dataChanged.emit({
        configs: { offlineMode: configOfflineMode, onlineMode: this.configs, assets: JSON.stringify(data.assets) },
        gameType: GAME_TYPE.matching,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.forEach((element) => {
      element.DataItemTop.forEach((item) => {
        assets.push(item.LinkAudio);
        assets.push(item.LinkImg);
        let urlAudio = item.LinkAudio.split('/');
        let urlPhoto = item.LinkImg.split('/');
        item.LinkAudio = urlAudio[urlAudio.length - 1];
        item.LinkImg = urlPhoto[urlPhoto.length - 1];
      });
      element.DataItemBottom.forEach((item) => {
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

  onTabChange($event: number) {
    this.activePane = $event;
  }

  getNewSection() {
    let model = {
      DataItemTop: [
        { LinkAudio: '', LinkImg: '', Key: '1' },
        { LinkAudio: '', LinkImg: '', Key: '2' },
        { LinkAudio: '', LinkImg: '', Key: '3' },
      ],
      DataItemBottom: [
        { LinkAudio: '', LinkImg: '', Key: '1' },
        { LinkAudio: '', LinkImg: '', Key: '2' },
        { LinkAudio: '', LinkImg: '', Key: '3' },
      ],
    };
    return model;
  }

  uploadRecourse = (obj: any, type) => {
    let inputTag = document.createElement('input');
    inputTag.type = 'file';
    if (type == 'image') {
      inputTag.accept = 'image/png, image/jpeg';
    } else if (type == 'audio') {
      inputTag.accept = 'audio/*';
    }
    let folderStore = this.FOLDER_STORE_RESOURCE_GAME.matching;
    inputTag.onchange = (_this: any) => {
      let files = _this.target.files;
      this.shareService
        .uploadProgress(files, folderStore, type)
        .then((res: any) => {
          res.subscribe((event: any) => {
            switch (event.type) {
              case HttpEventType.Sent:
                break;
              case HttpEventType.ResponseHeader:
                break;
              case HttpEventType.UploadProgress:
                obj.progress = Math.round((event.loaded / event.total) * 100);
                this.cd.detectChanges();
                break;
              case HttpEventType.Response:
                if (type == 'audio') {
                  obj.LinkAudio = event.body.path;
                  this.cd.detectChanges();
                }
            }
          });
        })
        .catch((e: any) => {
          alert('Tải dữ liệu thất bại');
        });
    };
    inputTag.click();
  };

  addNewSection() {
    this.configs.push(this.getNewSection());
  }

  setSrc($event: any, obj: any) {
    obj.LinkImg = $event;
  }

  removeSection(index: number) {
    this.configs.splice(index, 1);
  }

  setCount(index: number, count: number) {
    if (!(this.configs[index].DataItemTop.length == count)) {
      this.configs[index].DataItemTop = this.setArr(count);
      this.configs[index].DataItemBottom = this.setArr(count);
    }
  }

  setArr(count: number) {
    let arr = new Array(count * 1).fill('').map((a, i) => ({ LinkAudio: '', LinkImg: '', Key: i + 1 }));
    return arr;
  }
}
