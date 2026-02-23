import { Component, inject, input } from '@angular/core';
import { ErrorIcon } from '../svg/error/error-icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error',
  imports: [ErrorIcon],
  templateUrl: './error.html',
})
export class Error {
  message = input.required<string>();

  location = inject(Location);

  goBack() {
    this.location.back();
  }
}
