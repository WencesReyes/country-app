import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-country-search',
  imports: [],
  templateUrl: './country-search.html',
})
export class CountrySearch {
  searchInputChanged = output<string>();
  placeholder = input.required<string>();

  onSearchInputChanged(value: string) {
    this.searchInputChanged.emit(value);
  }
}
