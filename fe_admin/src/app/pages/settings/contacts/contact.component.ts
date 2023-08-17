import { ChangeDetectorRef, Component } from '@angular/core';
import { OptionQuery } from 'src/app/store/option/optionQuery';
import { ToastrService } from 'ngx-toastr';
import { AKITA_STORE } from 'src/app/containers/constants';
import { ContactService } from 'src/app/containers/services/contact.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  isSubmitted: boolean;
  contactForm: any = {
    mainContact: {},
    subContacts: [{}],
  };
  subContactForm = new FormArray([]);
  mainContactForm: FormGroup;
  constructor(
    private optionQuery: OptionQuery,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private contactService: ContactService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOption();
  }

  loadOption() {
    let options$ = this.optionQuery.selectAll();
    options$.subscribe((options) => {
      this.setInitialValues(options);
    });
  }

  setInitialValues = (options: any) => {
    if (options.length > 0) {
      this.getContacts();
    }
  };
  getContacts = () => {
    this.contactService
      .getAll()
      .then((res: any) => {
        this.contactForm.mainContact = res.find((x) => x.id == 1) || this.getNewContact();
        this.contactForm.subContacts = res.filter((x) => x.id != 1);
        if (this.contactForm.subContacts.length == 0) {
          this.contactForm.subContacts = [this.getNewContact()];
        }
        this.loadForm();
        this.cd.detectChanges();
      })
      .catch(() => {});
  };
  loadForm() {
    this.mainContactForm = this.fb.group({
      area: [this.contactForm.mainContact.area],
      phoneNumber: [this.contactForm.mainContact.phoneNumber, Validators.compose([Validators.required])],
      timeServing: [this.contactForm.mainContact.timeServing, Validators.compose([Validators.required])],
      id: [this.contactForm.mainContact.id, Validators.compose([Validators.required])],
    });
    this.contactForm.subContacts.forEach((c) => {
      this.addSubform(c);
    });
    this.cd.detectChanges();
  }

  addSubform(c) {
    const group = this.fb.group({
      area: [c.area, Validators.compose([Validators.required])],
      phoneNumber: [c.phoneNumber, Validators.compose([Validators.required])],
      timeServing: [c.timeServing, Validators.compose([Validators.required])],
      id: [c.id, Validators.compose([Validators.required])],
    });
    this.subContactForm.push(group);
  }

  isControlValid(formGroup, controlName: string): boolean {
    const control = formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(formGroup, controlName: string): boolean {
    const control = formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(formGroup, validation: string, controlName: string) {
    const control = formGroup?.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }
  updateContacts() {
    this.isSubmitted = true;
    let model = [...this.subContactForm.value, this.mainContactForm.value];
    this.contactService
      .updateContacts(model)
      .then((res: any) => {
        this.toastr.success('', 'Cập nhật số Hotline thành công');
        this.isSubmitted = false;
        this.cd.detectChanges();
      })
      .catch(() => {
        this.isSubmitted = false;
        this.cd.detectChanges();
      });
  }
  addContact = () => {
    let contact = this.getNewContact();
    this.addSubform(contact);
  };
  getNewContact() {
    return {
      id: 0,
      area: '',
      phoneNumber: '',
      timeServing: '',
    };
  }
  remove(index) {
    this.subContactForm.removeAt(index);
  }
}
