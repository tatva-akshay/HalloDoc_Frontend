import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

export function passwordValidator(control: AbstractControl):
    Observable<ValidationErrors | null> {
        debugger
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
  
      if (password.value!== confirmPassword.value) {
        confirmPassword.setErrors({ mismatchedPasswords: true });
      } else {
        confirmPassword.setErrors(null);
      }
    };
  }