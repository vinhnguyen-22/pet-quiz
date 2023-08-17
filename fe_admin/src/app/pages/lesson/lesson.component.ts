import { Component, OnInit, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from 'src/app/containers/services/lesson.service';
import { OptionStore } from 'src/app/store/option/optionStore';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { DOCUMENT_FILE_IMAGE, FILE_TYPE } from 'src/app/containers/constants';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit {
  @ViewChild('header') header: any;
  headerHeight: 0;
  panelId: string = 'ngb-panel-0';
  lessonId: number = 0;
  lesson: any = {};
  sections: any = [];
  @ViewChild('gameX') game: any;
  video: any;
  @ViewChild('checkAuto') checkAuto: any;
  @ViewChild('transcriptVideo') transcriptVideo: any;
  @ViewChild('transcriptAudio') transcriptAudio: any;
  @ViewChild('player') player: any;
  @ViewChild('control') control: any;
  isShowControl = false;
  fullScreen = false;
  autoPlay = false;
  isEnd = false;
  isSetDoc = false;
  nextAct: any;
  isPlay: boolean = false;
  isMove = false;
  sub: any;
  selectedDocument: any = {
    docTypeName: '',
    documentTypeId: 1,
    fileContent: '',
    id: 0,
    name: '',
    sectionsIdx: 0,
    activitiesIdx: 0,
    documentIdx: 0,
  };
  $DOCUMENT_FILE_TYPE = FILE_TYPE;
  $DOCUMENT_FILE_IMAGE = DOCUMENT_FILE_IMAGE;

  constructor(
    private actRoute: ActivatedRoute,
    public lessonService: LessonService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private shareService: ShareService,
    private optionStore: OptionStore,
    private translationService: TranslationService
  ) {
    let element = document.getElementById('kt_body');
    element.removeAttribute('style');
    this.lessonId = this.actRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getLessonDetail(this.lessonId);
  }

  ngAfterViewChecked(): void {
    this.setSrcGame();
    let isPlayNotAuto = true;
    let isElementFullScreen = false;
    if (this.autoPlay && this.isEnd) {
      Promise.resolve(this.documentAction('NEXT')).then(() => {
        this.videoAction(false);
        this.isEnd = false;
      });
      isPlayNotAuto = false;
    }
    if (this.isSetDoc && isPlayNotAuto) {
      this.videoAction(false);
      isPlayNotAuto = true;
      this.isSetDoc = false;
    }
    if (document.fullscreenElement) {
      isElementFullScreen = true;
    }
    if (!document.fullscreenElement && this.fullScreen && isElementFullScreen) {
      this.fullScreen = false;
    }
    this.cd.detectChanges();
  }

  getOptions = () => {
    this.shareService
      .getOptions()
      .then((res: any) => {
        this.optionStore.set(res);
      })
      .catch((err: any) => {});
  };

  setSrcGame = () => {
    if (this.selectedDocument.docTypeName === 'Game') {
      if (this.game && this.game.nativeElement.src !== this.selectedDocument.fileContent) {
        this.game.nativeElement.src = this.selectedDocument.fileContent;
        this.cd.detectChanges();
      }
    }
    this.cd.detectChanges();
  };

  videoAction(isPause) {
    switch (this.selectedDocument.docTypeName) {
      case 'Video':
        isPause ? this.video.nativeElement.pause() : this.video.nativeElement.play();
        this.isPlay = !isPause;
        break;
      case 'Audio':
        if (isPause) {
          this.transcriptVideo.nativeElement.pause();
          this.transcriptAudio.nativeElement.pause();
        } else {
          this.transcriptVideo.nativeElement.play();
          this.transcriptAudio.nativeElement.play();
        }
        this.isPlay = !isPause;
        break;
      default:
        break;
    }
  }
  onClickPlay = () => {
    this.videoAction(this.isPlay);
  };

  replay = () => {
    switch (this.selectedDocument.docTypeName) {
      case 'Video':
        this.video.nativeElement.currentTime = 0;
        break;
      case 'Transcript':
        this.transcriptAudio.nativeElement.currentTime = 0;
        break;
      default:
        break;
    }
    this.videoAction(false);
  };

  end = (type) => {
    if (!this.autoPlay) {
      if (type == 'TRANSCRIPT') {
        this.transcriptVideo.nativeElement.pause();
      }
      this.isPlay = false;
    } else {
      this.isEnd = true;
    }
  };

  changeAutoPlay = (event: any) => {
    this.autoPlay = event.target.checked;
  };

  setDocument = (d: any, sIdx: any, aIdx: any, dIdx: any) => {
    this.selectedDocument = {
      ...d,
      sectionsIdx: sIdx,
      activitiesIdx: aIdx,
      documentIdx: dIdx,
    };
    this.panelId = 'ngb-panel-' + sIdx;
    this.cd.detectChanges();
    if (aIdx + 1 < this.sections[sIdx].activities.length) {
      this.nextAct = this.sections[sIdx].activities[aIdx + 1];
    } else {
      let s = this.sections.find((a, i) => {
        return a.activities.length > 0 && i > sIdx;
      });
      if (s) {
        this.nextAct = s.activities[0];
      } else {
        this.nextAct = {};
      }
    }
    if (this.nextAct.teacherActivity) {
      let arr = this.nextAct.teacherActivity.split('- ');
      let string = arr.join('<br>- ');
      this.nextAct._teacherActivity = string.slice(4);
    }
    this.setSrcGame();
    this.isSetDoc = true;
  };

  setSections = (idx: any) => {
    if (this.panelId === 'ngb-panel-' + idx) {
      this.panelId = '';
    } else {
      this.panelId = 'ngb-panel-' + idx;
    }
  };

  documentAction(type) {
    let isNext = type == 'NEXT';
    const sectionsIdx = this.selectedDocument.sectionsIdx;
    const activitiesIdx = this.selectedDocument.activitiesIdx;
    const documentIdx = this.selectedDocument.documentIdx;
    if (isNext) {
      const documentLength =
        this.sections[this.selectedDocument.sectionsIdx]?.activities[this.selectedDocument.activitiesIdx]?.documentActivities.length;
      if (documentIdx + 1 < documentLength) {
        this.setDocument(
          this.sections[sectionsIdx].activities[activitiesIdx].documentActivities[documentIdx + 1].document,
          sectionsIdx,
          activitiesIdx,
          documentIdx + 1
        );
      } else {
        let idxAc = 0;
        const nextAc = this.sections[sectionsIdx]?.activities.find((a: any, i: number) => {
          const result = a?.documentActivities.length > 0 && activitiesIdx < i && i < this.sections[sectionsIdx].activities.length;
          if (result) idxAc = i;
          return result;
        });
        if (nextAc) {
          this.setDocument(this.sections[sectionsIdx].activities[idxAc].documentActivities[0].document, sectionsIdx, idxAc, 0);
        } else {
          this.nextSection(sectionsIdx);
        }
      }
    } else {
      if (documentIdx > 0) {
        this.setDocument(
          this.sections[sectionsIdx].activities[activitiesIdx].documentActivities[documentIdx - 1].document,
          sectionsIdx,
          activitiesIdx,
          documentIdx - 1
        );
      } else {
        let idxAc = 0;
        const prevAc = this.sections[sectionsIdx]?.activities.findLast((a: any, i: number) => {
          const result = a?.documentActivities.length > 0 && activitiesIdx > i;
          if (result) idxAc = i;
          return result;
        });
        if (prevAc) {
          const documentLength = this.sections[sectionsIdx]?.activities[idxAc]?.documentActivities.length;
          this.setDocument(this.sections[sectionsIdx].activities[idxAc].documentActivities.at(-1).document, sectionsIdx, idxAc, documentLength - 1);
        } else {
          this.prevSection(sectionsIdx);
        }
      }
    }
  }

  nextSection = (sectionsIdx) => {
    let idxSe = 0;
    const nextSe = this.sections.find((s: any, i: number) => {
      const _result = s.activities.find((a: any, i: number) => a.documentActivities.length > 0);
      const result = s.activities.length > 0 && sectionsIdx < i && i < this.sections.length && _result;
      if (result) idxSe = i;
      return result;
    });
    if (nextSe) {
      let idxAc = 0;
      const nextAc = nextSe.activities.find((a: any, i: number) => {
        const result = a.documentActivities.length > 0;
        if (result) idxAc = i;
        return result;
      });
      if (nextAc) {
        this.setDocument(this.sections[idxSe].activities[idxAc].documentActivities[0].document, idxSe, idxAc, 0);
      }
    } else {
      let idxSe = 0;
      const prevSe = this.sections.find((s: any, i: number) => {
        const _result = s.activities.find((a: any, i: number) => a.documentActivities.length > 0);
        const result = s.activities.length > 0 && _result;
        if (result) idxSe = i;
        return result;
      });
      if (prevSe) {
        let idxAc = 0;
        const nextAc = prevSe.activities.find((a: any, i: number) => {
          const result = a.documentActivities.length > 0;
          if (result) idxAc = i;
          return result;
        });
        if (nextAc) {
          this.setDocument(this.sections[idxSe].activities[idxAc].documentActivities[0].document, idxSe, idxAc, 0);
        }
      }
    }
  };

  prevSection = (sectionsIdx) => {
    let idxSe = 0;
    const prevSe = this.sections.findLast((s: any, i: number) => {
      const _result = s.activities.find((a: any, i: number) => a.documentActivities.length > 0);
      const result = s.activities.length > 0 && sectionsIdx > i && _result;
      if (result) idxSe = i;
      return result;
    });
    if (prevSe) {
      let idxAc = 0;
      const nextAc = prevSe.activities.findLast((a: any, i: number) => {
        const result = a.documentActivities.length > 0;
        if (result) idxAc = i;
        return result;
      });
      if (nextAc) {
        const documentLength = this.sections[idxSe].activities[idxAc]?.documentActivities.length;
        this.setDocument(this.sections[idxSe].activities[idxAc].documentActivities.at(-1).document, idxSe, idxAc, documentLength - 1);
      }
    }
  };

  showControl = () => {
    if (this.isShowControl) {
      this.control.nativeElement.classList.remove('show-control');
    } else {
      this.control.nativeElement.classList.add('show-control');
    }
    this.isShowControl = !this.isShowControl;
  };

  openFullScreen = () => {
    if (this.player.nativeElement.requestFullscreen) {
      this.player.nativeElement.requestFullscreen();
    } else if (this.player.nativeElement.webkitRequestFullscreen) {
      /* Safari */
      this.player.nativeElement.webkitRequestFullscreen();
    } else if (this.player.nativeElement.msRequestFullscreen) {
      /* IE11 */
      this.player.nativeElement.msRequestFullscreen();
    }
    this.fullScreen = true;
  };

  closeFullScreen = () => {
    const docWithBrowsersExitFunctions = document as Document & {
      mozCancelFullScreen(): Promise<void>;
      webkitExitFullscreen(): Promise<void>;
      msExitFullscreen(): Promise<void>;
    };
    if (docWithBrowsersExitFunctions.exitFullscreen) {
      docWithBrowsersExitFunctions.exitFullscreen();
    } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) {
      /* Firefox */
      docWithBrowsersExitFunctions.mozCancelFullScreen();
    } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      docWithBrowsersExitFunctions.webkitExitFullscreen();
    } else if (docWithBrowsersExitFunctions.msExitFullscreen) {
      /* IE/Edge */
      docWithBrowsersExitFunctions.msExitFullscreen();
    }
    this.fullScreen = false;
  };

  getLessonDetail = (lessonId: number) => {
    this.lessonService
      .getLesson(lessonId, this.translationService.getSelectedLanguage())
      .then((res: any) => {
        this.lesson = res;
        this.cd.detectChanges();
        this.headerHeight = this.header.nativeElement.offsetHeight;
        this.cd.detectChanges();
        this.sections = this.lesson.sections.map((s: any) => {
          s.activities = s.activities || [];
          return s;
        });
        let idxSe = 0;
        const prevSe = this.sections.find((s: any, i: number) => {
          const _result = s.activities.find((a: any, i: number) => a.documentActivities.length > 0);
          const result = s.activities.length > 0 && _result;
          if (result) idxSe = i;
          return result;
        });
        if (prevSe) {
          let idxAc = 0;
          const nextAc = prevSe.activities.find((a: any, i: number) => {
            const result = a.documentActivities.length > 0;
            if (result) idxAc = i;
            return result;
          });
          if (nextAc) {
            this.setDocument(this.sections[idxSe].activities[idxAc].documentActivities[0].document, idxSe, idxAc, 0);
            this.isSetDoc = false;
          }
        }
      })
      .catch((e: any) => {});
  };

  returnPage = () => {
    this.router.navigate(['/lessons']);
  };

  setObjVideo(event: any) {
    this.video = event.data;
  }

  onmousedown = (e) => {
    this.isMove = true;
  };

  onmouseup = (e) => {
    this.isMove = false;
  };

  onmousemove(e, type) {
    if (this.isMove) {
      let x = 0;
      let y = 0;
      if (type == 'mouse') {
        x = e.clientX;
        y = e.clientY - this.headerHeight;
      } else {
        e.preventDefault();
        const touchLocation = e.touches[0];
        x = touchLocation.clientX;
        y = touchLocation.clientY - this.headerHeight;
      }

      let bee = document.getElementById('bee');
      if (x > 0 && y > 0) {
        bee.style.left = x + 'px';
        bee.style.top = y + 'px';
      }
    }
  }

  ondragstart = () => {
    return false;
  };

  getDisplayAudioName(originalAudioName) {
    // replace all "_" with "'" when display
    var audioName = originalAudioName.replaceAll('_', "'");

    // if last char is "'" then replace with "?"
    var lastCharIndex = audioName.length - 1;
    var lastChar = audioName[lastCharIndex];
    if (lastChar == "'") {
      audioName = audioName.slice(0, lastCharIndex);
      audioName = audioName + '?';
    }

    return audioName;
  }
}
