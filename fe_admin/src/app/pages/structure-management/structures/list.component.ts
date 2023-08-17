import { Component, ChangeDetectorRef } from '@angular/core';
import { ShareService } from 'src/app/containers/services/share/share.service';
import { StructureService } from 'src/app/containers/services/structure.service';

@Component({
  selector: 'app-structure-list',
  templateUrl: './list.component.html',
})
export class StructureListComponent {
  private API_ENDPOINT = 'structures';
  filter = {
    status: 0,
    searchTerm: '',
  };
  structures: any = [];

  objectDataTable: any = {
    datas: [],
    headers: [
      {
        key: 'name',
        value: 'Tên cấu trúc',
        width: '15%',
      },
      {
        key: 'sectionsName',
        value: 'Danh sách phần học',
        width: '50%',
      },
      // {
      //   key: 'createdDate',
      //   value: 'Ngày tạo',
      //   width: '15%',
      // },
    ],
  };

  constructor(public structureService: StructureService, private cd: ChangeDetectorRef, public sharedService: ShareService) {}

  ngOnInit(): void {
    this.getStructures();
  }
  getStructures = () => {
    this.structureService
      .getByModel(this.API_ENDPOINT, this.filter)
      .then((res: any) => {
        this.objectDataTable.datas = res.map((s: any) => {
          let sectionsName = s.sections.map((se: any) => se.name).join(', ');
          return { ...s, sectionsName };
        });

        this.cd.detectChanges();
      })
      .catch((e) => {});
  };

  changeFilter = () => {
    this.getStructures();
  };
}
