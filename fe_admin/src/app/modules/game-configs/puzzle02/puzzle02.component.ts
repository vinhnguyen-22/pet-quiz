import { environment } from '../../../../environments/environment';

import { OnInit, Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from 'src/app/containers/constants';

@Component({
  selector: 'game-puzzle02',
  templateUrl: './puzzle02.html',
  styleUrls: ['./puzzle02.scss'],
})
export class Puzzle02Component implements OnInit, OnChanges {
  puzzle02Folder = FOLDER_STORE_RESOURCE_GAME.puzzle02;
  @Input() data: any;
  @Input() requestConfig: any;
  @Input() index: any;
  @Output() dataChanged = new EventEmitter<any>();
  configs: any = [];
  configExtraDatas: any = {};
  public puzzlePanes = [
    { name: '4 miếng', value: '2,2', type: 1 },
    { name: '6 miếng', value: '2,3', type: 3 },
    { name: '9 miếng', value: '3,3', type: 2 },
  ];

  constructor(private shareService: ShareService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    let obj = this.data && this.data.length > 0 ? JSON.parse(this.data) : [this.getNewSection()];
    this.configs = obj;

    for (let configIndex = 0; configIndex < this.configs.length; configIndex++) {
      let pane = this.puzzlePanes.find((pane) => Number(pane.type) == Number(this.configs[configIndex].Type));
      let valuesArray = pane.value.split(',');
      let row = Number(valuesArray[0]);
      let col = Number(valuesArray[1]);

      this.configExtraDatas[configIndex] = {};
      this.configExtraDatas[configIndex].DataItemLength = this.configs[configIndex].DataItem.length;
      this.configExtraDatas[configIndex].Row = row;
      this.configExtraDatas[configIndex].Col = col;
    }
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
        gameType: GAME_TYPE.puzzle02,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.forEach((element) => {
      assets.push(element.LinkAudio);
      assets.push(element.LinkImgDemo);
      let urlAudio = element.LinkAudio.split('/');
      element.LinkAudio = urlAudio[urlAudio.length - 1];

      let urlImgDemo = element.LinkImgDemo.split('/');
      element.LinkImgDemo = urlImgDemo[urlImgDemo.length - 1];

      element.DataItem.forEach((item) => {
        assets.push(item.LinkImg);
        let urlImg = item.LinkImg.split('/');
        item.LinkImg = urlImg[urlImg.length - 1];
      });
    });
    assets = assets.filter((item) => item);
    return { configs, assets };
  }

  getNewSection() {
    let model = {
      Type: '1',
      LinkImgDemo: '',
      DataItem: [
        {
          Id: '1',
          LinkImg: '',
        },
        {
          Id: '2',
          LinkImg: '',
        },
        {
          Id: '3',
          LinkImg: '',
        },
        {
          Id: '4',
          LinkImg: '',
        },
      ],
    };
    return model;
  }

  getActiveTabCSSClass(configIndex: number, matrixValue: string) {
    if (!matrixValue) {
      return;
    }
    let temp = matrixValue.split(',');
    let total = 1;
    for (let i = 0; i < temp.length; i++) {
      total = total * Number(temp[i]);
    }
    if (total == this.configs[configIndex].DataItem.length) {
      return 'active';
    }
    return '';
  }

  setPuzzleMatrix(index: number, p) {
    let config = this.configs[index];

    let valuesArray = p.value.split(',');
    this.configExtraDatas[index].Row = Number(valuesArray[0]);
    this.configExtraDatas[index].Col = Number(valuesArray[1]);

    var totalPicture = this.configExtraDatas[index].Row * this.configExtraDatas[index].Col;
    config.DataItem = [];
    config.Type = p.type.toString();
    for (let i = 0; i < totalPicture; i++) {
      config.DataItem.push({
        Id: (i + 1).toString(),
        LinkImg: '',
      });
    }
  }

  setImageSource(configIndex: number, $event: any) {
    this.configs[configIndex].LinkImgDemo = $event;
  }

  uploadResource = (index: number, type: string) => {
    let inputTag = document.createElement('input');
    inputTag.type = 'file';
    if (type == 'image') {
      inputTag.accept = 'image/png, image/jpeg';
    } else if (type == 'audio') {
      inputTag.accept = 'audio/*';
    }
    let folderStore = FOLDER_STORE_RESOURCE_GAME.puzzle02;
    inputTag.onchange = (_this: any) => {
      let files = _this.target.files;
      this.shareService
        .upload(files, folderStore, type)
        .then((res: any) => {
          this.configs[index].LinkAudio = res.path;
          this.cd.detectChanges();
        })
        .catch((e: any) => {});
    };
    inputTag.click();
  };

  setPuzzleImageSource(configIndex: number, currentRow: number, currentCol: number, $event: any) {
    var id = ((currentRow - 1) * this.configExtraDatas[configIndex].Col + currentCol).toString();
    var item = this.configs[configIndex].DataItem.find((item) => item.Id == id);
    if (item) {
      item.LinkImg = $event;
    } else {
      // item = {
      //   Id: id,
      //   LinkImg: $event
      // };
    }
  }

  getImageUrl(configIndex: number, currentRow: number, currentCol: number) {
    var id = ((currentRow - 1) * this.configExtraDatas[configIndex].Col + currentCol).toString();
    var item = this.configs[configIndex].DataItem.find((item) => item.Id == id);
    if (item) {
      return item.LinkImg;
    }

    return '';
  }

  removeGameScene(index: number) {
    this.configs.splice(index, 1);
    delete this.configExtraDatas[index];
  }

  addNewGameScene() {
    this.configs.push(this.getNewSection());
    let configIndex = this.configs.length - 1;

    this.configExtraDatas[configIndex] = {};
    this.configExtraDatas[configIndex].DataItemLength = this.configs[configIndex].DataItem.length;
    this.configExtraDatas[configIndex].Row = 2;
    this.configExtraDatas[configIndex].Col = 2;
  }

  setSrc($event: any, index: number) {
    this.configs[index].LinkImg = $event;
  }
}
