import { Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.html',
  styleUrls: ['./paging.scss'],
})
export class PagingComponent implements OnInit {
  @Output() dataChanged: any = new EventEmitter<any>();
  @Input() data: any = {
    pageSize: 0,
    totalItems: 0,
    page: 0,
    datas: [],
  };
  pageNumber = 0;
  pages: any = [];
  constructor() {}

  ngOnChanges(e) {
    this.pages = [];
    if (this.data.totalItems == 0) {
      this.pages = [1];
      return;
    }
    if (this.data.totalItems > 0 && this.data.pageSize > 0) {
      let result = +(this.data.totalItems / this.data.pageSize);
      this.pageNumber = Math.ceil(result);
    }
    if (this.pageNumber > 0 && this.pageNumber < 6) {
      this.pages = Array.from({ length: this.pageNumber }, (_, i) => i + 1);
    } else {
      let arr: any = this.getPagesByNumber(this.data.page, this.pageNumber);
      let hasOne = arr.find((p) => p == 1);
      let hasLast = arr.find((p) => p == this.pageNumber);
      if (!hasOne) {
        if (arr[0] == 2) {
          arr = [1, ...arr];
        } else {
          arr = [1, '...', ...arr];
        }
      }
      if (!hasLast) {
        if (arr.at(-1) + 1 == this.pageNumber) {
          arr = [...arr, this.pageNumber];
        } else {
          arr = [...arr, '...', this.pageNumber];
        }
      }
      this.pages = arr;
    }
  }
  ngOnInit(): void {}

  getPagesByNumber(page, maxPage) {
    let arr = [];
    arr = [page - 1, page, page + 1];
    arr = arr.filter((x) => x > 0 && x <= maxPage);
    return arr;
  }

  changePage = (type) => {
    switch (type) {
      case 'previous':
        if (this.data.page == 1) return;
        this.dataChanged.emit({ pageSize: this.data.pageSize, page: this.data.page - 1 });
        break;
      case 'first':
        if (this.data.page == 1) return;
        this.dataChanged.emit({ pageSize: this.data.pageSize, page: 1 });
        break;
      case 'next':
        if (this.data.page == this.pageNumber) return;
        if (0 == this.pageNumber) return;
        this.dataChanged.emit({ pageSize: this.data.pageSize, page: this.data.page + 1 });
        break;
      case 'last':
        if (this.data.page == this.pageNumber) return;
        if (0 == this.pageNumber) return;
        this.dataChanged.emit({ pageSize: this.data.pageSize, page: this.pageNumber });
        break;
      default:
        type > 0 && this.dataChanged.emit({ pageSize: this.data.pageSize, page: type });
        break;
    }
  };
  changePagesize() {
    this.dataChanged.emit({ pageSize: this.data.pageSize, page: 1 });
  }
}
