import {NgForm} from "@angular/forms";
import { ComponentCanDeactivate } from "./can-deactivate.component";

export abstract class FormCanDeactivate extends ComponentCanDeactivate{
 abstract isSubmitted: boolean;

 canDeactivate():boolean{
    return this.isSubmitted;
  }
}