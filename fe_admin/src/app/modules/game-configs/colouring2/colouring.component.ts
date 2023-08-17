import { HttpEventType } from '@angular/common/http';
import { OnInit, Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { DEFAULTBG, FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from 'src/app/containers/constants';

@Component({
  selector: 'game-colouring',
  templateUrl: './colouring.html',
  styleUrls: ['../index.scss', './colouring.scss'],
})
export class ColouringComponent implements OnInit, OnChanges {
  @ViewChild('image') image: any;
  folderStore = FOLDER_STORE_RESOURCE_GAME.colouring;
  type = 1;
  items = [];

  @Input() data: any;
  @Input() requestConfig: any;
  @Input() index: any;
  @Output() dataChanged = new EventEmitter<any>();
  configs: any = [];

  constructor(private shareService: ShareService, private cd: ChangeDetectorRef) {
    for (let index = 1; index <= 10; index++) {
      this.items.push({
        key: index,
        value: index + '',
      });
    }
  }
  ngOnInit(): void {
    this.configs = this.data && this.data.length > 0 ? JSON.parse(this.data) : [this.getNewSection()];
    this.configs.forEach((element) => {
      element.currentItem = element.ListBg[0];
      element.ListPen.map((pen) => {
        pen.ColorCode = JSON.stringify(pen.ColorCode);
      });
    });
  }
  ngOnChanges(): void {
    if (this.requestConfig) {
      this.configs.forEach((c) => {
        c.ListPen.map((pen) => {
          pen.ColorCode = JSON.parse(pen.ColorCode);
        });
      });
      let configGame = this.configs.map((x) => {
        let listPen = x.ListPen.map((y) => {
          return { ...y };
        });
        let listBg = x.ListBg.map((y) => {
          return { ...y };
        });
        return { ...x, ListPen: listPen, ListBg: listBg };
      });
      let data = this.convertDataOfflineMode(configGame);
      let configOfflineMode = JSON.stringify(data.configs);
      this.dataChanged.emit({
        configs: { offlineMode: configOfflineMode, onlineMode: this.configs, assets: JSON.stringify(data.assets) },
        gameType: GAME_TYPE.colouring,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.forEach((element) => {
      assets.push(element.LinkBG);
      let urlBg = element.LinkBG.split('/');
      element.LinkBG = urlBg[urlBg.length - 1];
      element.ListBg.forEach((item) => {
        assets.push(item.LinkPhoto);
        let urlPhoto = item.LinkPhoto.split('/');
        item.LinkPhoto = urlPhoto[urlPhoto.length - 1];
      });
      element.ListPen.forEach((item) => {
        assets.push(item.LinkImg);
        assets.push(item.LinkAudio);
        let urlImg = item.LinkImg.split('/');
        item.LinkImg = urlImg[urlImg.length - 1];
        let urlAudio = item.LinkAudio.split('/');
        item.LinkAudio = urlAudio[urlAudio.length - 1];
      });
    });
    assets = assets.filter((item) => item);
    return { configs, assets };
  }
  setLinkPhoto($event: any, type, pen) {
    pen[type] = $event;
    if (type == 'ColorCode') {
      let name = $event.split('.')[0];
      pen[type] = name;
    }
  }
  uploadRecourse = (obj: any, type: string) => {
    let inputTag = document.createElement('input');
    inputTag.type = 'file';
    if (type == 'image') {
      inputTag.accept = 'image/png, image/jpeg';
    } else if (type == 'audio') {
      inputTag.accept = 'audio/*';
    }
    inputTag.onchange = (_this: any) => {
      let files = _this.target.files;
      if (type == 'image') {
        const Img = new Image();
        Img.src = URL.createObjectURL(files[0]);
        Img.onload = (e: any) => {
          obj.height = e.path[0].height;
          obj.width = e.path[0].width;
        };
      }
      this.shareService
        .uploadProgress(files, this.folderStore, type)
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
                  obj.LinkBG = event.body.path;
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
      LinkBG: DEFAULTBG.COLOURING,
      height: 659,
      width: 932,
      ListBg: [
        { LinkPhoto: '', Coordinates: [], Id: 1 },
        { LinkPhoto: '', Coordinates: [], Id: 2 },
      ],
      ListPen: [
        {
          LinkImg: '',
          LinkAudio: '',
          ColorCode: '',
        },
        {
          LinkImg: '',
          LinkAudio: '',
          ColorCode: '',
        },
        {
          LinkImg: '',
          LinkAudio: '',
          ColorCode: '',
        },
        {
          LinkImg: '',
          LinkAudio: '',
          ColorCode: '',
        },
        {
          LinkImg: '',
          LinkAudio: '',
          ColorCode: '',
        },
      ],
    };
    model.currentItem = model.ListBg[0];
    return model;
  }

  removeSection(index: number) {
    this.configs.splice(index, 1);
  }
  getTD(e: any, obj: any) {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    const width = target.clientWidth;
    const height = target.clientHeight;
    const Iwidth = this.image.nativeElement.width;
    const scale = Iwidth / obj.width;
    const x = e.clientX - rect.left + 15 * scale;
    const y = e.clientY - rect.top + 5 * scale;
    obj.currentItem.Coordinates = [(x - 12 - width / 2) / scale, (y - height / 2) / -scale];
    obj.currentItem.top = y / scale;
    obj.currentItem.left = x / scale;
  }
  onMouseMove(e, i, obj) {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    const Iwidth = this.image.nativeElement.width;
    const scale = Iwidth / obj.width;
    const x = e.clientX - rect.left + 12 * scale;
    const y = e.clientY - rect.top + 5 * scale;
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
  getPT(obj) {
    const Iwidth = this.image?.nativeElement.width;
    return Iwidth / obj.width;
  }
  setCount(index: number, count: number) {
    if (!(this.configs[index].ListBg.length == count)) {
      this.configs[index].ListBg = new Array(count * 1).fill('').map((a, i) => ({
        Id: (i + 1).toString(),
        LinkPhoto: '',
        Coordinates: [0, 0],
        KeyColor: '',
      }));
    }
    this.configs[index].currentItem = this.configs[index].ListBg[0];
  }

  setCurrentItem(obj1: any, obj2: any) {
    obj1.currentItem = obj2;
  }
  setType(type) {
    this.type = type;
  }
}
