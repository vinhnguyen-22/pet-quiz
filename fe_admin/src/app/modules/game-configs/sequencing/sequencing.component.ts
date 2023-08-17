import { FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from './../../../containers/constants/index';
import { OnInit, Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'game-sequencing',
  templateUrl: './sequencing.html',
  styleUrls: ['../index.scss'],
})
export class SequencingComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() requestConfig: any;
  @Output() dataChanged = new EventEmitter<any>();
  private configs: any = [];
  currentValueType: any = 1;
  activePane = 0;
  folderStore = FOLDER_STORE_RESOURCE_GAME.sequencing;
  imageSelected = '';
  sections: any = [];

  typeImages: any = [
    {
      id: 1,
      name: '4 ô bên trên - 1 hình bên dưới',
    },
    {
      id: 5,
      name: '4 ô bên trên - 2 hình bên dưới',
    },
    {
      id: 2,
      name: '4 ô bên trên - 3 hình bên dưới',
    },
    {
      id: 3,
      name: '5 ô bên trên - 3 hình bên dưới',
    },
  ];

  constructor() {}
  ngOnInit(): void {
    if (this.data && this.data.length > 0) {
      this.configs = JSON.parse(this.data);
      this.configs.forEach((item) => {
        item.sectionRows = [];
        item.DataItemTop.forEach((itemOnTop) => {
          item.sectionRows.push({ ...itemOnTop, isOnTop: true });
        });
        item.DataItemBottom.forEach((itemOnBot) => {
          item.sectionRows.push({ ...itemOnBot, isOnTop: false });
        });
        this.sections.push(item);
      });
      this.sections.forEach((element) => {
        element.sectionRows.sort((a, b) => parseInt(a.Id) - parseInt(b.Id));
      });
    } else {
      this.sections.push(this.getNewSection(this.currentValueType));
    }
  }

  ngOnChanges(): void {
    if (this.requestConfig) {
      this.configs = this.formatConfig();
      let configGame = this.configs.map((x) => {
        let DataItemTop = x.DataItemTop.map((y) => {
          return { ...y };
        });

        let DataItemBottom = x.DataItemBottom.map((y) => {
          return { ...y };
        });
        return { ...x, DataItemBottom, DataItemTop };
      });
      let data = this.convertDataOfflineMode(configGame);
      let configOfflineMode = JSON.stringify(data.configs);
      this.dataChanged.emit({
        configs: { offlineMode: configOfflineMode, onlineMode: this.configs, assets: JSON.stringify(data.assets) },
        gameType: GAME_TYPE.sequencing,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.forEach((element) => {
      element.DataItemTop.forEach((item) => {
        assets.push(item.LinkImg);
        let urlImg = item.LinkImg.split('/');
        item.LinkImg = urlImg[urlImg.length - 1];
      });

      element.DataItemBottom.forEach((item) => {
        assets.push(item.LinkImg);
        let urlImg = item.LinkImg.split('/');
        item.LinkImg = urlImg[urlImg.length - 1];
      });
    });
    assets = assets.filter((item) => item);
    return { configs, assets };
  }

  changeType(event, index) {
    let value = event.target.value;
    let section = this.getNewSection(parseInt(value));
    this.sections[index] = section;
  }

  formatConfig() {
    let configs = [];
    this.sections.forEach((section) => {
      let config = {
        type: section.type == 5 ? 1 : section.type,
        DataItemTop: [],
        DataItemBottom: [],
      };
      section.sectionRows.forEach((row) => {
        if (row.isOnTop) {
          config.DataItemTop.push({ Id: row.Id, LinkImg: row.LinkImg });
        } else {
          config.DataItemBottom.push({ Id: row.Id, LinkImg: row.LinkImg });
        }
      });
      configs.push(config);
    });
    return configs;
  }

  addNewSection() {
    this.sections.push(this.getNewSection(this.currentValueType));
  }

  getNewSection(type) {
    let model = {
      type,
      sectionRows: [],
    };
    let loopNumber = type == 3 ? 5 : 4;
    for (let index = 1; index <= loopNumber; index++) {
      model.sectionRows.push({
        Id: index,
        LinkImg: '',
        isOnTop: true,
      });
    }
    return model;
  }

  imageOnBotChanged(obj, event) {
    obj.isOnTop = !event.target.checked;
  }
  setSrc(event, sr) {
    sr.LinkImg = event;
  }

  removeSection(index: number) {
    this.sections.splice(index, 1);
  }
}
