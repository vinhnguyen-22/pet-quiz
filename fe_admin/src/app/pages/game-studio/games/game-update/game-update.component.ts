import { environment } from './../../../../../environments/environment';
import { AKITA_STORE, DOCUMENT_FILE_TYPE_NAME, FILE_TYPE } from './../../../../containers/constants/index';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import KTWizard from '../../../../../assets/js/components/wizard';
import { KTUtil } from '../../../../../assets/js/components/util';
import { ActivatedRoute, Router } from '@angular/router';
import { GAME_TYPE, PREFIX_DESCRIPTION } from 'src/app/containers/constants';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { GameService } from 'src/app/containers/services/game.service';
import { ToastrService } from 'ngx-toastr';
import { FormCanDeactivate } from 'src/app/containers/guards/can-deactivate/can-deactivate';

@Component({
  selector: 'app-game-update',
  templateUrl: './game-update.component.html',
  styleUrls: ['./game-update.scss'],
})
export class GameUpdateComponent extends FormCanDeactivate implements OnInit {
  isSubmitted: boolean;

  @ViewChild('wizard', { static: true }) el: ElementRef;
  public Editor = ClassicEditor;
  requestConfig: any = false;
  gameType = GAME_TYPE;
  GAME_EMPTY = {
    id: 0,
    typeId: 0,
    name: '',
    gameName: '',
    description: '',
    gameImage: '',
    documentTypeId: FILE_TYPE.GAME,
    docTypeName: DOCUMENT_FILE_TYPE_NAME.GAME,
    config: [],
    fileContent: environment.domain + 'api/games/get?id=',
    configOfflineMode: [],
    LinkAudioTrue: environment.domainStatic + 'games/resources/ConfirmAnswer/CorrectGoodjobMale.mp3',
    LinkAudioFalse: environment.domainStatic + 'games/resources/ConfirmAnswer/IncorrectOops.mp3',
    gameType: '',
  };
  id: number;
  wizard: any;
  game: any = this.GAME_EMPTY;
  step: number = 1;
  isRequestInfo = false;
  gameTypes: any = [];
  currentGameType: object = {};
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private gameService: GameService,
    private optionQuery: OptionQuery,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) {
    super();
    this.id = this.actRoute.snapshot.params['id'] || null;
  }

  ngOnInit() {
    this.loadOption();
  }

  ngAfterViewInit(): void {
    this.wizard = new KTWizard(this.el.nativeElement, {
      startStep: 1,
    });

    this.wizard.on('change', (wizardObj) => {
      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);

      if (!this.game.gameName || !this.game.typeId) {
        wizardObj.stop();
      }

      let step = wizardObj.getStep();
      if (step == 1) {
        this.isRequestInfo = true;
        this.cd.detectChanges();
      }
    });
  }

  loadOption() {
    let options$ = this.optionQuery.selectAll();
    options$.subscribe((options) => {
      this.setInitialValues(options);
    });
  }

  setInitialValues = (options: any) => {
    if (options.length > 0) {
      this.gameTypes = options[AKITA_STORE.GAME_TYPE];
      this.cd.detectChanges();
      this.loadGame();
    }
  };

  loadGame() {
    if (this.id) {
      this.gameService
        .getById(this.id)
        .then((res: any) => {
          this.game = res;
          this.currentGameType = this.gameTypes.find((x) => x.id == this.game.typeId);
          this.gameTypeChanged();
          this.cd.detectChanges();
        })
        .catch((e) => {});
    } else {
      this.game = this.GAME_EMPTY;
      this.cd.detectChanges();
    }
  }

  validationDataGameConfig(data: any) {
    let config: any = [];

    switch (data.gameType) {
      case GAME_TYPE.matching:
        data.configs.forEach((c) => {
          let objConfig: any = {};
          let dataTops = [];
          let dataBottoms = [];
          c.DataItemTop.forEach((dt) => {
            if (dt.LinkAudio && dt.LinkImg) {
              dataTops.push(dt);
            }
          });
          c.DataItemBottom.forEach((dt) => {
            if (dt.LinkAudio && dt.LinkImg) {
              dataBottoms.push(dt);
            }
          });
          if (dataTops.length > 0) {
            objConfig = {
              DataItemTop: dataTops,
              DataItemBottom: dataBottoms,
            };
          }
          if (objConfig.DataItemTop) {
            config.push(objConfig);
          }
        });
        break;
      case GAME_TYPE.memoryGame:
        let i = 0;
        data.configs.forEach((c) => {
          let objConfig = {
            items: [],
          };
          c.items.forEach((item) => {
            if (item.Name && item.LinkImg && item.Key) {
              objConfig.items.push(item);
            }
          });
          i++;
          if (objConfig.items.length > 0) {
            config.push(objConfig);
          }
        });
        break;
      case GAME_TYPE.tf:
        let configTf = { data: [] };
        data.configs.data.forEach((c) => {
          if (c.LinkAudio && c.LinkImg) {
            configTf.data.push(c);
          }
        });
        config = configTf;
        break;
      case GAME_TYPE.sequencing:
        data.configs.forEach((c) => {
          let dataTop = [];
          let dataBottom = [];
          c.DataItemTop.forEach((di) => {
            if (di.LinkImg) {
              dataTop.push(di);
            }
          });
          c.DataItemBottom.forEach((di) => {
            if (di.LinkImg) {
              dataBottom.push(di);
            }
          });
          if (dataTop.length > 0) {
            config.push({ ...c, DataItemTop: dataTop, DataItemBottom: dataBottom });
          }
        });
        break;
      case GAME_TYPE.multipleChoiceImage:
        let obj = { data: [] };
        data.configs.forEach((c) => {
          if (c.LinkImg && c.KeyPass && c.LinkAudio) {
            obj.data.push(c);
          }
        });
        config = obj;
        break;
      case GAME_TYPE.multipleChoiceAudio:
        data.configs.forEach((c) => {
          if (c.LinkAudio && c.KeyPass) {
            config.push(c);
          }
        });
        break;
      case GAME_TYPE.finding:
        data.configs.forEach((c) => {
          if (c.LinkAudio && c.LinkBG) {
            config.push(c);
          }
        });
        break;
      case GAME_TYPE.findingDifferences:
        data.configs.forEach((c) => {
          if (c.LinkBGLeft && c.LinkBGRight) {
            config.push(c);
          }
        });
        break;
      case GAME_TYPE.flashcard1:
        data.configs.forEach((c) => {
          if (c.LinkAudio && c.LinkImg) {
            config.push(c);
          }
        });
        break;
      case GAME_TYPE.flashcard2:
        data.configs.forEach((element) => {
          let dataSpin = [];
          element.DataSpin.forEach((ds) => {
            if (ds.Name && ds.LinkImg) {
              dataSpin.push(ds);
            }
          });
          config.push({ ...element, DataSpin: dataSpin });
        });
        break;
      case GAME_TYPE.flashcard3:
        let dataList = [];
        data.configs.data.forEach((c) => {
          if (c.LinkAudio && c.LinkImg) {
            dataList.push(c);
          }
        });
        config = { data: dataList };
        break;
      case GAME_TYPE.flashcard4:
        let fc4Items = [];
        data.configs.data.forEach((element) => {
          if (element.LinkAudio && element.LinkPhoto) {
            fc4Items.push(element);
          }
        });
        config = { data: fc4Items };
        break;
      case GAME_TYPE.flashcard5:
        data.configs.forEach((element) => {
          let dataItem = [];
          element.DataItem.forEach((e) => {
            if (e.LinkAudio && e.LinkImg && e.Text) {
              dataItem.push(e);
            }
          });
          config.push({ DataItem: dataItem });
        });
        break;
      case GAME_TYPE.classify2groups:
        data.configs.forEach((element) => {
          if (element.TextLeft && element.TextRight) {
            config.push(element);
          }
        });
        break;
      case GAME_TYPE.classify1groups:
        data.configs.forEach((element) => {
          if (element.Text) {
            config.push(element);
          }
        });
        break;
      case GAME_TYPE.answeringImage:
        let items = [];
        data.configs.data.forEach((element) => {
          if (element.LinkAudio && element.LinkPhoto) {
            items.push(element);
          }
        });
        config = { data: items };
        break;
      case GAME_TYPE.answeringAudio:
        let aaObj = [];
        data.configs.data.forEach((element) => {
          if (element.LinkAudio) {
            aaObj.push(element);
          }
        });
        config = { data: aaObj };
        break;
      case GAME_TYPE.unscramble:
        let unsObj = [];
        data.configs.data.forEach((element) => {
          if (element.LinkAudio && element.Text) {
            unsObj.push(element);
          }
        });
        config = { data: unsObj };
        break;
      case GAME_TYPE.puzzle1:
        data.configs.forEach((element) => {
          if (element.LinkPhoto && element.Type) {
            config.push(element);
          }
        });
        break;
      case GAME_TYPE.drawing:
        let drawDatas = [];
        data.configs.data.forEach((element) => {
          if (element.LinkPhoto && element.LinkAudio) {
            drawDatas.push(element);
          }
        });
        config = { data: drawDatas };
        break;
      case GAME_TYPE.puzzle02:
        data.configs.forEach((element) => {
          if (element.LinkImgDemo) {
            config.push(element);
          }
        });
      case GAME_TYPE.tracing:
        data.configs.forEach((element) => {
          if (element.LinkPhoto && element.LinkAudio) {
            config.push(element);
          }
        });
        break;
      case GAME_TYPE.colouring:
        data.configs.forEach((element) => {
          if (element.LinkPhoto && element.ListPen[0].LinkImg && element.ListPen[0].LinkAudio && element.ListPen[0].ColorCode) {
            config.push(element);
          }
          config.push(element);
        });
        break;
      case GAME_TYPE.colouringAudio:
        data.configs.forEach((element) => {
          if (element.LinkPhoto && element.LinkAudio && element.ListPen[0].LinkImg && element.ListPen[0].LinkAudio && element.ListPen[0].ColorCode) {
            config.push(element);
          }
          config.push(element);
        });
        break;
      case GAME_TYPE.unscrambleImage:
        data.configs.forEach((element) => {
          if (element.LinkAudio && element.ListImg[0].Link) {
            config.push(element);
          }
        });
        break;
    }
    return JSON.stringify(config);
  }

  getGameName(type) {
    let gameType = this.gameTypes.find((x) => x.id == type);
    return gameType.typeName;
  }

  configChanged(data: any) {
    this.isSubmitted = true;
    let gameConfig = this.validationDataGameConfig({ gameType: data.gameType, configs: data.configs.onlineMode });
    let name = this.getGameName(this.game.typeId);
    let game = { ...this.game, name, config: gameConfig, configOfflineMode: data.configs.offlineMode, assets: data.configs.assets };
    let textMess = (this.id ? 'Chỉnh sửa' : 'Thêm') + ' Game';
    this.gameService
      .update(game)
      .then((res: any) => {
        this.router.navigate(['/games'], { relativeTo: this.actRoute });
        this.toastr.success('', textMess + ' thành công');
      })
      .catch((e) => {
        this.isSubmitted = false;
        this.toastr.error('', textMess + ' thất bại');
        this.cd.detectChanges();
      });
  }

  gameTypeChanged() {
    let gameType = this.getGameType(this.game.typeId);
    this.game.gameType = gameType ? gameType.typeName : '';
    this.game.descriptions = gameType ? gameType.gameDescription.split(PREFIX_DESCRIPTION) : '';
    this.cd.detectChanges();
  }

  getGameType(typeId: number) {
    let gameType = typeId ? this.gameTypes.find((x: any) => x.id == typeId) : null;
    return gameType;
  }

  setSrc($event: any) {
    this.game.gameImage = $event;
  }

  onSubmit() {
    this.requestConfig = true;
    this.cd.detectChanges();
  }
}
