import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ShareService } from "src/containers/services/share/share.service";

@Component({
  selector: "app-input-img",
  templateUrl: "./inputImg.component.html",
  styleUrls: ["./inputImg.scss"],
})
export class InputImgComponent {
  @Output() setValueToChild = new EventEmitter<string>();
  setValueToParent() {
    this.setValueToChild.emit(this.currentUrl);
  }
  @Output() setName = new EventEmitter<string>();
  setNameToParent() {
    this.setName.emit(this.name);
  }
  name: string;
  @Input() type?: any;
  @Input() folder?: any;
  @Input() currentUrl?: any;
  constructor(public shareService: ShareService) {}
  uploadImage = () => {
    let inputTag = document.createElement("input");
    inputTag.type = "file";
    inputTag.accept = "image/png, image/jpeg";
    inputTag.onchange = (_this: any) => {
      let files = _this.target.files;
      this.name = files[0].name;
      this.shareService
        .upload(files, this.folder, "image")
        .then((res: any) => {
          this.currentUrl = res.path;
          this.setValueToParent();
          this.setNameToParent();
        })
        .catch((e: any) => {});
    };
    inputTag.click();
  };
}
