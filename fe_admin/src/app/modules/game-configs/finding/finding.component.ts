import { HttpEventType } from '@angular/common/http';
import { OnInit, Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from 'src/app/containers/constants';

@Component({
  selector: 'game-finding',
  templateUrl: './finding.html',
  styleUrls: ['../index.scss', './finding.scss'],
})
export class FindingComponent implements OnInit, OnChanges {
  @ViewChild('image') image: any;

  items = [];
  sizes = [
    {
      key: '0.3',
      value: 'Nhỏ',
    },
    {
      key: '0.4',
      value: 'Vừa',
    },
    {
      key: '0.5',
      value: 'Lớn',
    },
  ];
  color = [];
  SECTION_EMPTY = {
    DataPosition: [
      {
        pos: [],
        left: 0,
        top: 0,
        Scale: '0.3',
        Id: '1',
      },
      {
        pos: [],
        left: 0,
        top: 0,
        Scale: '0.3',
        Id: '2',
      },
    ],
    DataItem: [
      {
        Id: '1',
        LinkImg: '',
      },
      {
        Id: '2',
        LinkImg: '',
      },
    ],
    LinkAudio: '',
    LinkBG: '',
  };

  globalListenFunc: Function;
  @Input() data: any;
  @Input() requestConfig: any;
  @Input() index: any;
  @Output() dataChanged = new EventEmitter<any>();
  configs: any = [];

  constructor(private shareService: ShareService, private cd: ChangeDetectorRef) {
    for (let index = 1; index <= 10; index++) {
      this.items.push({
        key: index,
        value: index + ' Chi tiết',
      });
    }
  }
  ngOnInit(): void {
    this.configs = this.data && this.data.length > 0 ? JSON.parse(this.data) : [{ ...this.SECTION_EMPTY }];
    this.configs.forEach((element) => {
      element.currentItem = element.DataPosition[0];
    });
  }

  ngOnChanges(): void {
    if (this.requestConfig) {
      let configGame = this.configs.map((x) => {
        let dataItem = x.DataItem.map((y) => {
          return { ...y };
        });
        return { ...x, DataItem: dataItem };
      });
      let data = this.convertDataOfflineMode(configGame);
      let configOfflineMode = JSON.stringify(data.configs);
      this.dataChanged.emit({
        configs: { offlineMode: configOfflineMode, onlineMode: this.configs, assets: JSON.stringify(data.assets) },
        gameType: GAME_TYPE.finding,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.forEach((element) => {
      assets.push(element.LinkBG);
      let urlBg = element.LinkBG.split('/');
      element.LinkBG = urlBg[urlBg.length - 1];
      assets.push(element.LinkAudio);
      let urlAudio = element.LinkAudio.split('/');
      element.LinkAudio = urlAudio[urlAudio.length - 1];
      element.DataItem.forEach((item) => {
        assets.push(item.LinkImg);
        let urlImg = item.LinkImg.split('/');
        item.LinkImg = urlImg[urlImg.length - 1];
      });
    });
    assets = assets.filter((item) => item);
    return { configs, assets };
  }

  uploadRecourse = (obj: any, type: string) => {
    let inputTag = document.createElement('input');
    inputTag.type = 'file';
    if (type == 'image') {
      inputTag.accept = 'image/png, image/jpeg';
    } else if (type == 'audio') {
      inputTag.accept = 'audio/*';
    }
    let folderStore = FOLDER_STORE_RESOURCE_GAME.finding;
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
      DataPosition: [
        {
          pos: [],
          left: 0,
          top: 0,
          Scale: '0.3',
          Id: '1',
        },
        {
          pos: [],
          left: 0,
          top: 0,
          Scale: '0.3',
          Id: '2',
        },
      ],
      DataItem: [
        {
          Id: '1',
          LinkImg: '',
        },
        {
          Id: '2',
          LinkImg: '',
        },
      ],
      LinkAudio: '',
      LinkBG: '',
    };
    model.currentItem = model.DataPosition[0];
    return model;
  }
  setSrc($event: any, dataItem) {
    dataItem.LinkImg = $event;
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
    const x = e.clientX - rect.left + 30 * (Iwidth / obj.width);
    const y = e.clientY - rect.top + 5 * (Iwidth / obj.width);
    obj.currentItem.pos = `[${(x - width / 2) / (Iwidth / obj.width)}, ${(y - height / 2) / -(Iwidth / obj.width)}]`;
    obj.currentItem.top = y / (Iwidth / obj.width);
    obj.currentItem.left = x / (Iwidth / obj.width);
  }
  onMouseMove(e, i, obj) {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    const Iwidth = this.image.nativeElement.width;
    const x = e.clientX - rect.left + 30 * (Iwidth / obj.width);
    const y = e.clientY - rect.top + 5 * (Iwidth / obj.width);
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
    if (!(this.configs[index].DataItem.length == count)) {
      this.configs[index].DataItem = new Array(count * 1).fill('').map((a, i) => ({
        LinkImg: '',
        Id: (i + 1).toString(),
      }));
      this.configs[index].DataPosition = new Array(count * 1).fill('').map((a, i) => ({
        pos: [],
        left: 0,
        top: 0,
        Scale: '0.3',
        Id: (i + 1).toString(),
      }));
      this.configs[index].currentItem = this.configs[index].DataPosition[0];
    }
  }

  setPos(obj1: any, obj2: any, value: any) {
    obj1.currentItem = obj2;
    obj2.Scale = value;
  }
  setCurrentItem(obj1: any, obj2: any) {
    obj1.currentItem = obj2;
  }
}
