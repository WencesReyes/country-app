import { Component } from '@angular/core';
import { CountrySearch } from '../../components/country-search/country-search';
import { CountryTable } from '../../components/country-table/country-table';

@Component({
  selector: 'app-by-country',
  imports: [CountrySearch, CountryTable],
  templateUrl: './by-country.html',
})
export default class ByCountry {
  onSearch(value: string) {
    console.log(value);
  }
}
