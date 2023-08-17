import { OnInit, Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { GAME_TYPE, FOLDER_STORE_RESOURCE_GAME } from 'src/app/containers/constants';

@Component({
  selector: 'game-puzzle1',
  templateUrl: './puzzle01.html',
  styleUrls: ['../index.scss'],
})
export class Puzzle01Component implements OnInit, OnChanges {
  @Input() data: any;
  @Input() requestConfig: any;
  @Output() dataChanged = new EventEmitter<any>();
  configs: any = [];
  folderStore = FOLDER_STORE_RESOURCE_GAME.puzzle1;
  types: any = [
    { key: 1, value: '4 miếng' },
    { key: 3, value: '6 miếng' },
    { key: 2, value: '9 miếng' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.configs =
      this.data && this.data.length > 0
        ? JSON.parse(this.data)
        : [
            {
              LinkPhoto: '',
              LinkAudio: '',
              Type: '1',
            },
          ];
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
        gameType: GAME_TYPE.puzzle1,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.forEach((element) => {
      assets.push(element.LinkAudio);
      assets.push(element.LinkPhoto);
      let urlAudio = element.LinkAudio.split('/');
      element.LinkAudio = urlAudio[urlAudio.length - 1];

      let urlImg = element.LinkPhoto.split('/');
      element.LinkPhoto = urlImg[urlImg.length - 1];
    });
    assets = assets.filter((item) => item);
    return { configs, assets };
  }

  setSrc($event: any, obj) {
    obj.LinkPhoto = $event;
  }

  addNewSection() {
    this.configs.push({
      LinkPhoto: '',
      LinkAudio: '',
      Type: '1',
    });
  }

  changeType(obj, type) {
    obj.Type = type;
  }
  removeSection(index: number) {
    this.configs.splice(index, 1);
  }
}
