import { OnInit, Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from 'src/app/containers/constants';
@Component({
  selector: 'classify2groups',
  templateUrl: './classify2groups.html',
  styleUrls: ['./classify2groups.scss'],
})
export class Classify2GroupsComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() requestConfig: any;
  @Input() index: any;
  @Output() dataChanged = new EventEmitter<any>();
  configs: any = [];

  activeTabIds: any = {};
  tabIds = [0];
  defaultWordTypeTag = '0';
  classify2GroupsFolder = FOLDER_STORE_RESOURCE_GAME.classify2groups;

  numberOfPicturesInGameScene = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  zeroPad = (num, places) => String(num).padStart(places, '0');

  constructor() {}

  ngOnInit(): void {
    this.configs = this.data && this.data.length > 0 ? JSON.parse(this.data) : [this.getNewConfig()];

    for (let configIndex = 0; configIndex < this.configs.length; configIndex++) {
      this.activeTabIds[configIndex] = this.configs[configIndex].DataItem.length;
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
        gameType: GAME_TYPE.classify2groups,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.forEach((config) => {
      config.DataItem.forEach((element) => {
        assets.push(element.LinkImg);
        let urls = element.LinkImg.split('/');
        element.LinkImg = urls[urls.length - 1];
      });
    });
    assets = assets.filter((item) => item);
    return { configs, assets };
  }

  addNewGameScene() {
    var newConfig = this.getNewConfig();
    this.configs.push(newConfig);

    this.activeTabIds[this.configs.length - 1] = newConfig.DataItem.length;
  }

  removeGameScene(index: number) {
    delete this.activeTabIds[this.configs.length - 1];
    this.configs.splice(index, 1);
  }

  setActiveTab(tabId: number, configIndex: number) {
    this.activeTabIds[configIndex] = tabId;
    var config = this.configs[configIndex];
    var dataItemLength = config.DataItem.length;

    if (dataItemLength === tabId) {
      return;
    }

    // if move to tab that has larger item
    if (dataItemLength < tabId) {
      for (let i = dataItemLength; i < tabId; i++) {
        var blankDataItem = {
          LinkImg: '',
          Tag: this.defaultWordTypeTag,
        };

        config.DataItem.push(blankDataItem);
      }
    } else if (dataItemLength > tabId) {
      // if move to tab that has smaller item
      var dataItems = [];
      for (let i = 0; i < tabId; i++) {
        dataItems.push(config.DataItem[i]);
      }

      config.DataItem = dataItems;
    }
  }

  getActiveTabCSSClass(tabId: number, configIndex: number) {
    if (tabId !== this.activeTabIds[configIndex]) {
      return '';
    }

    return 'active';
  }

  setImageSource(configIndex: number, itemIndex: number, $event: any) {
    this.configs[configIndex].DataItem[itemIndex].LinkImg = $event;
  }

  getNewConfig() {
    return {
      TextLeft: '',
      TextRight: '',
      DataItem: [
        {
          LinkImg: '',
          Tag: this.defaultWordTypeTag,
        },
        {
          LinkImg: '',
          Tag: this.defaultWordTypeTag,
        },
      ],
    };
  }
}
