import { AbstractControl, ValidationErrors } from '@angular/forms';
import { EMAIL_REGEX } from '../Constant/constant';
import { Observable, of } from 'rxjs';

export function emailValidator(control: AbstractControl):
    Observable<ValidationErrors | null> {
    const value: string = control.value;

    if (value && value.trim() !== '' && !EMAIL_REGEX.test(value)) {
        return of({ 'invalidEmail': true });
    }
    return of(null);
}
