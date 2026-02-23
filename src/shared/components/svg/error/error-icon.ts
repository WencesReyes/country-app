import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-icon',
  imports: [],
  templateUrl: './error-icon.html',
})
export class ErrorIcon {
  width = input<number>(24);
  height = input<number>(24);
}
