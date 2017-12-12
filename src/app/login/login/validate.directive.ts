import { Directive, forwardRef, Attribute } from '@angular/core';
import {NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

@Directive({
  selector: '[formControlName],' +
  '[formControl],' +
  '[ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidateDirective), multi: true }
  ]
})
export class ValidateDirective implements Validator {
  validate(c: AbstractControl): ValidationErrors | null {
    return undefined;
  }
}
