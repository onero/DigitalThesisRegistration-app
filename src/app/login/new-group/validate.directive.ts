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
  constructor(@Attribute('validateEqual') public validateEqual: string) {
  }

  validate(AC: AbstractControl): { [key: string]: any } {
      // self value (e.g. retype password) - Gets the currentPassword from input.
      const confirmPassword = AC.value;
      // control value (e.g. password) - Gets the password from validateEqual in confirmPassword input.
      const passwordInputControl = AC.root.get(this.validateEqual);
      // Checks first if there is something in passwordInputControl.
      // If so check if the Password.value if not equal, return something means something is wrong.
      if (passwordInputControl && confirmPassword !== passwordInputControl.value) {
        return {
          // needs some kind of return.
          validateEqual: false
        };
      }
      // The password and conformPassword is the same.
      return null;
    }
}
