import { AKITA_STORE } from './../../../containers/constants/index';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GAME_TYPE } from 'src/app/containers/constants';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { GameService } from 'src/app/containers/services/game.service';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { CommonModalComponent } from 'src/app/modules/SharedModule/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { DocumentService } from 'src/app/containers/services/document.service';

@Component({
  selector: 'app-games',
  templateUrl: 'list-component.html',
})
export class GameListComponent implements OnInit {
  @ViewChild('confirmationModal')
  private modalComponent!: CommonModalComponent;

  @ViewChild('ModalView') ModalView: any;
  gameType = GAME_TYPE;
  games: any = [];
  filter: any = {
    name: '',
    page: 1,
    pageSize: 10,
    documentTypeId: 1,
    gameTypeId: 0,
    usageType: 0,
  };
  dataPaging: any = {
    pageSize: 0,
    totalItems: 0,
    page: 0,
    datas: [],
  };
  currentUser: any = {};
  currentGame: any = {};
  requestConfig: boolean = false;
  gameView: any = {};
  isViewDetail = false;
  gameTypes: any = [];
  isOpenModalUpdate = false;
  isOpenModalConfig = false;
  isGameEmpty = false;
  constructor(
    private gameService: GameService,
    private documentService: DocumentService,
    private optionQuery: OptionQuery,
    private cd: ChangeDetectorRef,
    public modalService: NgbModal,
    public auth: AuthService,
    private toastr: ToastrService,
    public sharedService: ShareService
  ) {
    this.auth.currentUserSubject.asObservable().subscribe((res) => {
      this.currentUser = res;
    });
  }

  ngOnInit(): void {
    this.getGames();
    this.getGameType();
    this.loadOption();
  }
  ngAfterViewChecked(): void {}
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
    }
  };

  getGames = () => {
    this.isGameEmpty = true;
    this.documentService
      .getDocumentsForLibraryPagination(this.filter)
      .then((res: any) => {
        this.games = res.datas;
        this.dataPaging = res;
        this.isGameEmpty = false;
        this.cd.detectChanges();
      })
      .catch((e) => {});
  };
  dataChanged($event) {
    this.filter = {
      ...this.filter,
      page: $event.page,
      pageSize: $event.pageSize,
    };
    this.getGames();
  }
  filterChanged = () => {
    this.getGames();
  };

  getGameType() {
    this.gameService
      .getGameType()
      .then((res: any) => {
        this.gameTypes = res;
        this.cd.detectChanges();
      })
      .catch((e) => {});
  }

  openModal = (doc: any) => {
    this.gameView = doc;
    this.cd.detectChanges();
    let r = this.modalService.open(this.ModalView, {
      size: 'xl',
    });

    r.shown.subscribe(() => {
      this.setSrcGame();
    });

    this.cd.detectChanges();
  };
  setSrcGame = () => {
    let game = document.getElementById('gameControl') as HTMLIFrameElement;
    if (game !== null) {
      game.src = this.gameView.fileContent;
    }
    this.cd.detectChanges();
  };
  copyLinkGame(game) {
    this.toastr.success('', 'Sao chép');
    navigator.clipboard.writeText(game.fileContent);
  }

  remove(game) {
    let values = {
      gameId: game.id,
    };

    this.openRemoveGameConfirmationModal(values, 'Xoá trò chơi', 'Bạn có muốn xoá trò chơi này không?');
  }

  async openRemoveGameConfirmationModal(values, title: string, text: string) {
    return await this.modalComponent.openDeleteConfirmationModal(values, title, text);
  }

  getConfirmationValue($event: any) {
    let returnData = $event;

    if (returnData.result == 'Confirm') {
      let gameId = returnData.values.gameId;
      this.gameService
        .remove(gameId)
        .then((res: any) => {
          this.getGames();
          this.toastr.success('', 'Xóa Game thành công');
        })
        .catch((e) => {
          this.toastr.error('', 'Xóa Game thất bại');
        });
    }
  }
}
