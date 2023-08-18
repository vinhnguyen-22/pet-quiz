import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CustomerService } from "src/services/customer.service";
import { ShareService } from "src/services/share/share.service";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"],
})
export class CustomerComponent implements OnInit {
  objectDataTable: any = {
    datas: [],
    actions: [],
    headers: [
      {
        key: "userName",
        value: "Họ tên",
      },
      {
        key: "role",
        value: "Vai trò",
      },
      {
        key: "phoneNumber",
        value: "Điện thoại",
      },
      {
        key: "email",
        value: "Email",
      },
      {
        key: "address",
        value: "Đơn vị công tác",
      },
      {
        key: "createdDate",
        value: "Ngày đăng ký",
      },
    ],
  };

  constructor(
    private customerService: CustomerService,
    private cd: ChangeDetectorRef,
    public sharedService: ShareService
  ) {}
  ngOnInit(): void {
    this.getCustomers();
  }
  getCustomers = () => {
    this.customerService
      .get()
      .then((res: any) => {
        res.forEach((c) => {
          c.createdDate = c.createdDate;
          c.role = c.role == "Teacher" ? "Giáo viên" : "Phụ huynh";
        });
        this.objectDataTable.datas = res;
        this.cd.detectChanges();
      })
      .catch((e) => {});
  };
}
