import { environment } from '../../../../environments/environment';

import { FOLDER_STORE_RESOURCE_GAME, GAME_TYPE } from '../../../containers/constants/index';
import { OnInit, Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ShareService } from 'src/app/containers/services/share/share.service';

@Component({
  selector: 'game-flashcard4',
  templateUrl: './flashcard4.html',
  styleUrls: ['../index.scss'],
})
export class Flashcard4Component implements OnInit, OnChanges {
  SECTION_EMPTY = {
    LinkHiddenPhoto: '',
    LinkPhoto: '',
    LinkAudio: '',
  };
  folderStore = FOLDER_STORE_RESOURCE_GAME.flashcard4;

  @Input() data: any;
  @Input() requestConfig: any;
  @Input() index: any;
  @Output() dataChanged = new EventEmitter<any>();
  configs: any = [];
  answerNumber: number = 2;

  constructor(private shareService: ShareService, private cd: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.configs = this.data && this.data.length > 0 ? JSON.parse(this.data) : { data: [{ ...this.SECTION_EMPTY }] };
  }

  ngOnChanges(): void {
    if (this.requestConfig) {
      let configGame = {
        data: [],
      };
      configGame.data = this.configs.data.map((x) => {
        return { ...x };
      });
      let data = this.convertDataOfflineMode(configGame);
      let configOfflineMode = JSON.stringify(data.configs);
      this.dataChanged.emit({
        configs: { offlineMode: configOfflineMode, onlineMode: this.configs, assets: JSON.stringify(data.assets) },
        gameType: GAME_TYPE.flashcard4,
      });
    }
  }

  convertDataOfflineMode(configs) {
    let assets = [];
    configs.data.forEach((element) => {
      assets.push(element.LinkAudio);
      assets.push(element.LinkPhoto);
      assets.push(element.LinkHiddenPhoto);
      let urlAudio = element.LinkAudio.split('/');
      let urlPhoto = element.LinkPhoto.split('/');
      let urlHidePhoto = element.LinkHiddenPhoto.split('/');
      element.LinkAudio = urlAudio[urlAudio.length - 1];
      element.LinkPhoto = urlPhoto[urlPhoto.length - 1];
      element.LinkHiddenPhoto = urlHidePhoto[urlHidePhoto.length - 1];
    });
    assets = assets.filter((item) => item);
    return { configs, assets };
  }

  uploadRecourse = (data, type: string) => {
    let inputTag = document.createElement('input');
    inputTag.type = 'file';
    if (type == 'image') {
      inputTag.accept = 'image/png, image/jpeg';
    } else if (type == 'audio') {
      inputTag.accept = 'audio/*';
    }
    inputTag.onchange = (_this: any) => {
      let files = _this.target.files;
      this.shareService
        .upload(files, this.folderStore, type)
        .then((res: any) => {
          let audioUrlItems = res.path.split('/');
          data.NameAudio = audioUrlItems[audioUrlItems.length - 1];
          data.LinkAudio = res.path;
          this.cd.detectChanges();
        })
        .catch((e: any) => {});
    };
    inputTag.click();
  };

  addNewSection() {
    let sectionList = [...this.configs.data];
    sectionList.push({ ...this.SECTION_EMPTY });
    this.configs.data = sectionList;
  }

  setSrc($event: any, section, key) {
    section[key] = $event;
  }

  removeSection(index: number) {
    this.configs.data.splice(index, 1);
  }
}
