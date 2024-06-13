import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';

export function passwordValidator(control: AbstractControl):
  Observable<ValidationErrors | null> {
  const value: string = control.value;
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{8,}$/;

  if (value && !pattern.test(value)) {
    return of({ 'invalidPassword': true });
  }
  return of(null);
}

export function matchPasswords(passwordControlName: string, confirmPasswordControlName: string) {
  return (formGroup: FormGroup) => {
    const password = formGroup.controls[passwordControlName];
    const confirmPassword = formGroup.controls[confirmPasswordControlName];

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatchedPasswords: true });
    } else {
      confirmPassword.setErrors(null);
    }
  };
}

export const passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  debugger
  const password = control.get('Password');
  const confirmPassword = control.get('ConfirmPassword');

  return password?.value === confirmPassword?.value ? null : { notmatched: true };
};

export function ConfirmPasswordValidator(Password: string, ConfirmPassword: string): ValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {

    if (Password !== ConfirmPassword) {
      return of({ 'invalidAge': true });
    }

    return of(null);
  };
}