import { AfterViewInit, Component, ElementRef, ViewChildren } from "@angular/core";
import { AbstractControl, FormControlName, UntypedFormGroup, Validators } from "@angular/forms";
import { fromEvent, merge, Observable } from "rxjs";
import { FormValidatorHelper, ValidationMessages } from "src/app/core/helpers/form-validation";

@Component({
  template: ''
})
export abstract class BaseForm implements AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })

  formInputElements: ElementRef[] = [];
  form!: UntypedFormGroup;
  validationMessages: ValidationMessages | undefined;
  formValidator: FormValidatorHelper | undefined;
  displayMessage: any = {};
  constructor() { }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.formValidator?.processar(this.form);
    });
  }

  checkValidity(key: string) {
    this.form.controls[key].markAsDirty();
    this.displayMessage = this.formValidator?.processar(this.form);
  }

  clearMessage = () => {
    this.displayMessage = {};
  };

  updateValidators(keys: string[]): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);

      if (keys.includes(key))
        control?.setValidators([Validators.required]);
      else
        control?.clearValidators();

      control?.updateValueAndValidity();

    })
  }
}