import { Component, computed, inject, resource, signal } from '@angular/core';
import { CountrySearch } from '../../components/country-search/country-search';
import { CountryTable } from '../../components/country-table/country-table';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country',
  imports: [CountrySearch, CountryTable],
  templateUrl: './by-country.html',
})
export default class ByCountry {
  countryService = inject(CountryService);

  protected searchValue = signal('');

  countriesResource = rxResource({
    params: () => ({ query: this.searchValue() }),
    stream: ({ params: { query }, abortSignal }) => {
      if (!query) {
        return of([]);
      }

      return this.countryService.getByCountry(query, abortSignal);
    },
  });

  protected tableState = computed(() => ({
    countries: this.countriesResource.error() ? [] : (this.countriesResource.value() ?? []),
    isLoading: this.countriesResource.isLoading(),
    error: this.countriesResource.error(),
    isEmpty: this.countriesResource.error()
      ? true
      : (this.countriesResource.value() ?? []).length === 0,
  }));
}
