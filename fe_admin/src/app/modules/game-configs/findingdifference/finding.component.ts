import { style } from '@angular/animations';
import { environment } from '../../../../environments/environment';

import { OnInit, Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from 'src/app/containers/constants';

@Component({
  selector: 'game-finding-difference',
  templateUrl: './finding-difference.html',
  styleUrls: ['../index.scss', './finding.scss'],
})
export class FindingDifferenceComponent implements OnInit, OnChanges {
  @ViewChild('cursor') cursor: any;
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
        Id: '1',
        pos: [],
        left: 0,
        top: 0,
        Scale: '0.3',
      },
      {
        Id: '2',
        pos: [],
        left: 0,
        top: 0,
        Scale: '0.3',
      },
    ],
    LinkBGLeft: '',
    LinkBGRight: '',
  };
  globalListenFunc: Function;
  @Input()
  data: any;
  @Input() requestConfig: any;
  @Input() index: any;
  @Output() dataChanged = new EventEmitter<any>();
  configs: any = [];

  constructor(private shareService: ShareService, private cd: ChangeDetectorRef) {
    for (let index = 1; index <= 5; index++) {
      this.items.push({
        key: index,
        value: index + ' điểm',
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
        return { ...x };
      });
      let data = this.convertDataOfflineMode(configGame);
      let configOfflineMode = JSON.stringify(data.configs);
      this.dataChanged.emit({
        configs: { offlineMode: configOfflineMode, onlineMode: this.configs, assets: JSON.stringify(data.assets) },
        gameType: GAME_TYPE.findingDifferences,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.forEach((element) => {
      assets.push(element.LinkBGLeft);
      assets.push(element.LinkBGRight);
      let urlBgLeft = element.LinkBGLeft.split('/');
      let urlBgRight = element.LinkBGRight.split('/');
      element.LinkBGLeft = urlBgLeft[urlBgLeft.length - 1];
      element.LinkBGRight = urlBgRight[urlBgRight.length - 1];
    });
    assets = assets.filter((item) => item);
    return { configs, assets };
  }

  uploadRecourse = (obj: any, type: string, index: number) => {
    let inputTag = document.createElement('input');
    inputTag.type = 'file';
    if (type == 'image') {
      inputTag.accept = 'image/png, image/jpeg';
    } else if (type == 'audio') {
      inputTag.accept = 'audio/*';
    }
    let folderStore = FOLDER_STORE_RESOURCE_GAME.findingDifferences;
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
        .upload(files, folderStore, type)
        .then((res: any) => {
          if (index == 1) {
            obj.LinkBGLeft = res.path;
          } else {
            obj.LinkBGRight = res.path;
          }
          this.cd.detectChanges();
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
          Id: '1',
          pos: [],
          left: 0,
          top: 0,
          Scale: '0.3',
        },
        {
          Id: '2',
          pos: [],
          left: 0,
          top: 0,
          Scale: '0.3',
        },
      ],
      LinkBGLeft: '',
      LinkBGRight: '',
    };
    model.currentItem = model.DataPosition[0];
    return model;
  }

  setSrc($event: any, dataItem, index: number) {
    dataItem.LinkImg = $event;
  }

  removeSection(index: number) {
    this.configs.splice(index, 1);
  }

  onMouseMove(e, obj, i) {
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

  getPT(obj) {
    const Iwidth = this.image?.nativeElement.width;
    return Iwidth / obj.width;
  }

  setCount(index: number, count: number) {
    if (!(this.configs[index].DataPosition.length == count)) {
      this.configs[index].DataPosition = new Array(count * 1).fill('').map((a, i) => ({
        Id: i + 1,
        pos: [],
        left: 0,
        top: 0,
        Scale: '0.3',
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
