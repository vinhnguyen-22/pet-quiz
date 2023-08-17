import { style } from '@angular/animations';
import { environment } from '../../../../environments/environment';
import { HttpEventType } from '@angular/common/http';
import { OnInit, Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { DEFAULTBG, FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from 'src/app/containers/constants';

@Component({
  selector: 'game-tracing',
  templateUrl: './tracing.html',
  styleUrls: ['../index.scss', './tracing.scss'],
})
export class TracingComponent implements OnInit, OnChanges {
  @ViewChild('image') image: any;

  padding = (962 * 100) / 1920;
  globalListenFunc: Function;
  @Input()
  data: any;
  @Input() requestConfig: any;
  @Input() index: any;
  @Output() dataChanged = new EventEmitter<any>();
  configs: any = [];
  constructor(private shareService: ShareService, private cd: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.configs = this.data && this.data.length > 0 ? JSON.parse(this.data) : [this.getNewSection()];
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
        gameType: GAME_TYPE.tracing,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.forEach((element) => {
      assets.push(element.LinkPhoto);
      assets.push(element.LinkBG);
      assets.push(element._LinkPhoto);
      assets.push(element.LinkAudio);

      let urlPhoto = element.LinkPhoto.split('/');
      element.LinkPhoto = urlPhoto[urlPhoto.length - 1];
      let urlBG = element.LinkBG.split('/');
      element.LinkBG = urlBG[urlBG.length - 1];
      let _urlPhoto = element._LinkPhoto.split('/');
      element._LinkPhoto = _urlPhoto[_urlPhoto.length - 1];
      let urlAudio = element.LinkAudio.split('/');
      element.LinkAudio = urlAudio[urlAudio.length - 1];
    });
    assets = assets.filter((item) => item);
    return { configs, assets };
  }

  uploadRecourse = (obj: any, type: string, typeI: number) => {
    let inputTag = document.createElement('input');
    inputTag.type = 'file';
    if (type == 'image') {
      inputTag.accept = 'image/png, image/jpeg';
    } else if (type == 'audio') {
      inputTag.accept = 'audio/*';
    }
    let folderStore = FOLDER_STORE_RESOURCE_GAME.tracing;
    inputTag.onchange = (_this: any) => {
      let files = _this.target.files;
      if (type == 'image' && typeI == 2) {
        const Img = new Image();
        Img.src = URL.createObjectURL(files[0]);
        Img.onload = (e: any) => {
          obj.height = e.path[0].height;
          obj.width = e.path[0].width;
        };
      }
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
                if (type == 'audio') {
                  obj.progress = Math.round((event.loaded / event.total) * 100);
                  this.cd.detectChanges();
                }
                break;
              case HttpEventType.Response:
                if (type == 'image') {
                  if (typeI == 1) {
                    obj.LinkPhoto = event.body.path;
                  } else if (typeI == 2) {
                    obj._LinkPhoto = event.body.path;
                  } else {
                    obj.LinkBG = event.body.path;
                  }
                } else if (type == 'audio') {
                  obj.LinkAudio = event.body.path;
                }
                this.cd.detectChanges();
            }
          });
        })

        .catch((e: any) => {});
    };
    inputTag.click();
  };

  addNewSection() {
    this.configs.push(this.getNewSection());
  }
  getNewSection() {
    let model: any = {
      LineWidth: 10,
      LinkAudio: '',
      LinkPhoto: '',
      _LinkPhoto: '',
      LinkBG: DEFAULTBG.TRACING,
      DataPoint: [],
      _DataPoint: [],
    };
    return model;
  }

  removeSection(index: number) {
    this.configs.splice(index, 1);
  }
  onMouseMove(e, obj, i) {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    const Iwidth = this.image.nativeElement.width;
    const scale = Iwidth / obj.width;
    const x = e.clientX - rect.left + 15 * scale;
    const y = e.clientY - rect.top + 15 * scale;
    let cursor = document.getElementById('cursor' + i);
    if (obj.width > 0) {
      cursor.style.display = 'block';
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';
    }
  }
  onMouseOut(i) {
    let cursor = document.getElementById('cursor' + i);
    cursor.style.display = 'none';
  }
  getTD(e: any, obj: any) {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    const width = target.clientWidth;
    const height = target.clientHeight;
    const Iwidth = this.image.nativeElement.width;
    const scale = Iwidth / obj.width;
    const x = e.clientX - rect.left + 15 * scale;
    const y = e.clientY - rect.top + 15 * scale;
    let item = [(x - 12 - width / 2) / scale, (y + 35 - height / 2) / -scale];
    obj.DataPoint.push(item);
    obj._DataPoint.push([x / scale, y / scale]);
  }
  getPT(obj) {
    const Iwidth = this.image?.nativeElement.width;
    return Iwidth / obj.width;
  }
  reset(obj: any) {
    obj.DataPoint = [];
    obj._DataPoint = [];
  }
}
