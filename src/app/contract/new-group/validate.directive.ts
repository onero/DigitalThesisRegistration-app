import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[validateEqual]' +
  '[formControlName],' +
  '[formControl],' +
  '[ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidateDirective), multi: true }
  ]
})
export class ValidateDirective implements Validator {
  constructor( @Attribute('validateEqual') public validateEqual: string) {}

  validate(AC: AbstractControl): { [key: string]: any } {
    // self value (e.g. retype password)
    const value = AC.value;

    // control value (e.g. password)
    const equal = AC.root.get(this.validateEqual);

    // value not equal
    if (equal && value !== equal.value) {
      return {
        validateEqual: false
      };
    }
    return null;
  }
}
