import { Component } from '@angular/core';
import { CountrySearch } from '../../components/country-search/country-search';
import { CountryTable } from '../../components/country-table/country-table';

@Component({
  selector: 'app-by-capital',
  imports: [CountrySearch, CountryTable],
  templateUrl: './by-capital.html',
})
export class ByCapital {
  onSearch(value: string) {
    console.log(value);
  }
}
