import { FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from '../../../containers/constants/index';
import { OnInit, Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'game-memory',
  templateUrl: './memory.html',
  styleUrls: ['../index.scss', './memory.scss'],
})
export class Memory1Component implements OnInit, OnChanges {
  @Input() data: any;
  @Input() requestConfig: any;
  @Output() dataChanged = new EventEmitter<any>();

  folderStore = FOLDER_STORE_RESOURCE_GAME.memoryGame;

  configs: any = [];
  activePane = 0;
  imageSelected = '';
  dataTops: any = [];
  dataBottoms: any = [];
  public panes = [
    { name: '2 thẻ', value: '2' },
    { name: '3 thẻ', value: '3' },
    { name: '4 thẻ', value: '4' },
    { name: '5 thẻ', value: '5' },
  ];
  constructor() {}
  ngOnInit(): void {
    if (this.data && this.data.length > 0) {
      let configs = JSON.parse(this.data);
      configs.forEach((config) => {
        let dataTops = [];
        let dataBottoms = [];
        for (let i = 0; i < config.items.length; i++) {
          if (config.items[i].IsAnswer == 'true') {
            dataTops.push(config.items[i]);
          } else {
            dataBottoms.push(config.items[i]);
          }
          config.dataTops = dataTops;
          config.dataBottoms = dataBottoms;
        }
        this.configs.push(config);
      });
    } else {
      this.configs = [this.getNewSection()];
    }
  }

  ngOnChanges(): void {
    if (this.requestConfig) {
      this.configs.forEach((config) => {
        config.items = [];
        config.dataTops.forEach((dt) => {
          config.items.push(dt);
        });
        config.dataBottoms.forEach((db) => {
          config.items.push(db);
        });
        delete config.dataTops;
        delete config.dataBottoms;
      });
      let configGame = this.configs.map((x) => {
        let items = x.items.map((y) => {
          return { ...y };
        });
        return { ...x, items };
      });
      let data = this.convertDataOfflineMode(configGame);
      let configOfflineMode = JSON.stringify(data.configs);
      this.dataChanged.emit({
        configs: { offlineMode: configOfflineMode, onlineMode: this.configs, assets: JSON.stringify(data.assets) },
        gameType: GAME_TYPE.memoryGame,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.forEach((element) => {
      element.items.forEach((element) => {
        assets.push(element.LinkImg);
        let urlPhoto = element.LinkImg.split('/');
        element.LinkImg = urlPhoto[urlPhoto.length - 1];
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
      dataTops: [
        {
          Name: '1',
          LinkImg: '',
          Key: '1',
          IsAnswer: 'true',
        },
        {
          Name: '2',
          LinkImg: '',
          Key: '2',
          IsAnswer: 'true',
        },
      ],
      dataBottoms: [
        {
          Name: '1',
          LinkImg: '',
          Key: '1',
          IsAnswer: 'false',
        },
        {
          Name: '2',
          LinkImg: '',
          Key: '2',
          IsAnswer: 'false',
        },
      ],
    };
    return model;
  }

  addNewSection() {
    this.configs.push(this.getNewSection());
  }

  setSrc($event: any, obj: any) {
    obj.LinkImg = $event;
  }

  setCount(config, count: number) {
    if (!(config.dataTops.length == count)) {
      config.dataTops = [];
      config.dataBottoms = [];
      for (let index = 0; index < count; index++) {
        config.dataTops.push({
          Name: index + 1,
          LinkImg: '',
          Key: index + 1,
          IsAnswer: 'true',
        });
        config.dataBottoms.push({
          Name: index + 1,
          LinkImg: '',
          Key: index + 1,
          IsAnswer: 'false',
        });
      }
    }
  }

  removeSection(index: number) {
    this.configs.splice(index, 1);
  }
}
