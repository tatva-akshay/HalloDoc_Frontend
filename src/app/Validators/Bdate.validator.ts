import { ValidationErrors } from "@angular/forms";
import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
import { Observable, defer, of } from "rxjs";

export function futureDateValidator(control: AbstractControl):
    Observable<ValidationErrors | null> {
    const selectedDate: Date = new Date(control.value);
    const today: Date = new Date();

    if (selectedDate > today) {
        {
            return of({ 'futureDate': true });
        }
    }
    return of(null);
}

// export function ageRangeValidator(minAge: number, maxAge: number): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } | null => {
//         debugger
//       if (control.value) {
//         const birthdate: Date = new Date(control.value);
//         const today: Date = new Date();
//         const age: number = today.getFullYear() - birthdate.getFullYear();
  
//         if (age < minAge || age > maxAge) {
//           return { invalidAge: true };
//         }
//       }
  
//       return null;
//     };
//   }

export function ageRangeValidator(minAge: number, maxAge: number): ValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        debugger
      const birthdate: Date = new Date(control.value);
      const today: Date = new Date();
      const age: number = today.getFullYear() - birthdate.getFullYear();
  
      if (age < minAge || age > maxAge) {
        return defer(() => of({ 'invalidAge': true }));
      }
      return defer(() => of(null));
    };
  }
