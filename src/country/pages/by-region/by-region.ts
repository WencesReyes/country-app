import { Component } from '@angular/core';
import { CountryTable } from '../../components/country-table/country-table';

@Component({
  selector: 'app-by-region',
  imports: [CountryTable],
  templateUrl: './by-region.html',
})
export default class ByRegion {}
