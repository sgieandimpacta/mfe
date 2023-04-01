import { ValidatorFn } from '@angular/forms';
import { BooleanFn } from './boolean-fn';

export function conditionalValidator(
  predicate: BooleanFn,
  validator: ValidatorFn,
  errorNamespace?: string
): ValidatorFn {
  return (formControl) => {
    if (!formControl.parent) {
      return null;
    }
    let error = null;
    if (predicate()) {
      error = validator(formControl);
    }
    if (errorNamespace && error) {
      const customError = {};
      (customError as any)[errorNamespace] = error;
      error = customError;
    }
    return error;
  };
}
