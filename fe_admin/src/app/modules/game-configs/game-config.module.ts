import { MatchingComponent } from './matching/matching.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { InputImgModule } from '../inputImg/inputImg.module';
import { FlashCard1Component } from './flashcards1/flashcard1.component';
import { Classify2GroupsComponent } from './classify2groups/classify2groups.component';
import { Classify1GroupsComponent } from './classify1groups/classify1groups.component';
import { TfComponent } from './tf/tf.component';
import { Flashcard2Component } from './flashcards2/flashcard2.component';
import { SequencingComponent } from './sequencing/sequencing.component';
import { Flashcard5Component } from './flashcards5/flashcard5.component';
import { MultipleChoiceAudioComponent } from './multipleChoiceAudio/multipleChoiceAudio.component';
import { MultipleChoiceImageComponent } from './multipleChoiceImage/multipleChoiceImage.component';
import { Memory1Component } from './memory1/memory.component';
import { FindingComponent } from './finding/finding.component';
import { FindingDifferenceComponent } from './findingdifference/finding.component';
import { FlashCard3Component } from './flashcards3/flashcard3.component';
import { Flashcard4Component } from './flashcards4/flashcard4.component';
import { AnsweringAudioComponent } from './answeringAudio/answeringAudio.component';
import { AnsweringImageComponent } from './answeringImage/answeringImage.component';
import { UnscrambleComponent } from './unscramble/unscramble.component';
import { Puzzle01Component } from './puzzle01/puzzle01.component';
import { ColouringComponent } from './colouring2/colouring.component';
import { DrawingComponent } from './drawing/drawing.component';
import { Puzzle02Component } from './puzzle02/puzzle02.component';
import { TracingComponent } from './tracing/tracing.component';
import { ColouringAudioComponent } from './colouringAudio2/colouring.component';
import { UnscrambleImageComponent } from './unscrambleImage/unscrambleImage.component';

@NgModule({
  imports: [CommonModule, FormsModule, InputImgModule, InlineSVGModule.forRoot(), InputImgModule],
  declarations: [
    FlashCard1Component,
    Flashcard2Component,
    FlashCard3Component,
    Flashcard4Component,
    Flashcard5Component,
    TfComponent,
    TracingComponent,
    MultipleChoiceImageComponent,
    MultipleChoiceAudioComponent,
    Classify1GroupsComponent,
    Classify2GroupsComponent,
    MatchingComponent,
    SequencingComponent,
    Memory1Component,
    AnsweringImageComponent,
    AnsweringAudioComponent,
    UnscrambleComponent,
    Puzzle01Component,
    FindingComponent,
    FindingDifferenceComponent,
    TracingComponent,
    ColouringComponent,
    ColouringAudioComponent,
    DrawingComponent,
    Puzzle02Component,
    UnscrambleImageComponent,
  ],
  exports: [
    FlashCard1Component,
    Flashcard2Component,
    FlashCard3Component,
    Flashcard4Component,
    Flashcard5Component,
    TfComponent,
    MultipleChoiceImageComponent,
    MultipleChoiceAudioComponent,
    Classify1GroupsComponent,
    Classify2GroupsComponent,
    MatchingComponent,
    SequencingComponent,
    Memory1Component,
    AnsweringImageComponent,
    AnsweringAudioComponent,
    UnscrambleComponent,
    Puzzle01Component,
    FindingComponent,
    FindingDifferenceComponent,
    TracingComponent,
    ColouringComponent,
    ColouringAudioComponent,
    DrawingComponent,
    Puzzle02Component,
    TracingComponent,
    UnscrambleImageComponent,
  ],
})
export class GameConfigModule { }
