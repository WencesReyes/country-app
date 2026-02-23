import { Component, input } from '@angular/core';
import { Country } from '../../models/country';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-table',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-table.html',
})
export class CountryTable {
  countries = input.required<Country[]>();

  errorMessage = input<string | null | undefined | unknown>('');
  isEmpty = input(false);
  isLoading = input(false);
}
