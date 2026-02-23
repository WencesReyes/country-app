import { Component, inject, input } from '@angular/core';
import { Country } from '../../../models/country';
import { DecimalPipe, Location } from '@angular/common';

@Component({
  selector: 'app-country-information',
  imports: [DecimalPipe],
  templateUrl: './country-information.html',
})
export class CountryInformation {
  country = input.required<Country>();
  location = inject(Location);
  protected readonly currentYear = new Date().getFullYear();

  goBack() {
    this.location.back();
  }
}
