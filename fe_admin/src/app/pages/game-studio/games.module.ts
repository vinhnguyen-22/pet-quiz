import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { GameUpdateComponent } from './games/game-update/game-update.component';
import { EmptyTableModule } from 'src/app/modules/empty-table/empty-table.module';
import { GameListComponent } from './games/list.component';
import { GamesRouting } from './games-routing';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { GameComponent } from './games.component';
import { InputImgModule } from 'src/app/modules/inputImg/inputImg.module';
import { GameConfigModule } from 'src/app/modules/game-configs/game-config.module';
import { SharedModule } from 'src/app/modules/SharedModule/shared.module';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';
import { PagingModule } from 'src/app/modules/paging/paging.module';

@NgModule({
  declarations: [GameUpdateComponent, GameListComponent, GameComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    GamesRouting,
    FormsModule,
    EmptyTableModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    InputImgModule,
    PagingModule,
    GameConfigModule,
    CKEditorModule,
    SharedModule,
    TranslationModule,
  ],
})
export class GameModule {}
