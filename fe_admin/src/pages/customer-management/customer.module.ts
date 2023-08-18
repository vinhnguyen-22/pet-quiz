import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CustomerRoutingModule } from "./customer-routing";
import { CustomerComponent } from "./customer.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { EmptyTableModule } from "src/modules/empty-table/empty-table.module";

@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    EmptyTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
})
export class CustomerModule {}
