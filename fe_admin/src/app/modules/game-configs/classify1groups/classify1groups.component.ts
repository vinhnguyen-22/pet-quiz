import { OnInit, Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from 'src/app/containers/constants';

@Component({
  selector: 'classify1groups',
  templateUrl: './classify1groups.html',
  styleUrls: ['./classify1groups.scss'],
})
export class Classify1GroupsComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() requestConfig: any;
  @Input() index: any;
  @Output() dataChanged = new EventEmitter<any>();
  configs: any = [];

  activeTabIds: any = {};
  classify1GroupsFolder = FOLDER_STORE_RESOURCE_GAME.classify1groups;
  zeroPad = (num, places) => String(num).padStart(places, '0');

  numberOfPicturesInGameScene = [2, 3, 4, 5, 6, 7];

  constructor(private shareService: ShareService, private cd: ChangeDetectorRef) {}

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
        gameType: GAME_TYPE.classify1groups,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.forEach((config) => {
      config.DataItem.forEach((element) => {
        assets.push(element.LinkImg);
        assets.push(element.LinkAudio);
        let urlAudio = element.LinkAudio ? element.LinkAudio.split('/') : element.LinkAudio;
        let urlImg = element.LinkImg ? element.LinkImg.split('/') : element.LinkImg;
        element.LinkImg = urlImg ? urlImg[urlImg.length - 1] : urlImg;
        element.LinkAudio = urlAudio ? urlAudio[urlAudio.length - 1] : urlAudio;
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
    // remove active tab key
    // then remove config
    delete this.activeTabIds[this.configs.length - 1];
    this.configs.splice(index, 1);
  }

  removeAudio(configIndex: number, itemIndex: number) {
    this.configs[configIndex].DataItem[itemIndex].LinkAudio = '';
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
        var blankDataItem = this.getNewConfig();

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

  checkBoxChanged(configIndex: number, itemIndex: number, $event: any) {
    var item = this.configs[configIndex].DataItem[itemIndex];
    item.LinkAudio = '';
  }

  getNewConfig() {
    return {
      Text: '',
      DataItem: [
        {
          LinkImg: '',
          LinkAudio: '',
        },
        {
          LinkImg: '',
          LinkAudio: '',
        },
      ],
    };
  }

  getFileName(inputFileUrl: string) {
    if (!inputFileUrl) {
      return '';
    }
    let urlItems = inputFileUrl ? inputFileUrl.split('/') : inputFileUrl;
    return urlItems ? urlItems[urlItems.length - 1] : urlItems;
  }

  uploadResource = (configIndex: number, itemIndex: number, type: string) => {
    let inputTag = document.createElement('input');
    inputTag.type = 'file';
    if (type == 'image') {
      inputTag.accept = 'image/png, image/jpeg';
    } else if (type == 'audio') {
      inputTag.accept = 'audio/*';
    }
    let folderStore = FOLDER_STORE_RESOURCE_GAME.classify1groups;
    inputTag.onchange = (_this: any) => {
      let files = _this.target.files;
      this.shareService
        .upload(files, folderStore, type)
        .then((res: any) => {
          var item = this.configs[configIndex].DataItem[itemIndex];
          if (type == 'audio') {
            item.LinkAudio = res.path;
            this.cd.detectChanges();
          }
        })
        .catch((e: any) => {});
    };
    inputTag.click();
  };
}
