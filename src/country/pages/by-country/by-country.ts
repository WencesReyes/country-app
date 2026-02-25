import { Component, computed, inject, signal } from '@angular/core';
import { CountrySearch } from '../../components/country-search/country-search';
import { CountryTable } from '../../components/country-table/country-table';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country',
  imports: [CountrySearch, CountryTable],
  templateUrl: './by-country.html',
})
export default class ByCountry {
  protected countryService = inject(CountryService);
  protected activactedRoute = inject(ActivatedRoute);
  protected router = inject(Router);

  protected queryParam = this.activactedRoute.snapshot.queryParamMap.get('query') ?? '';
  protected searchValue = signal(this.queryParam);

  countriesResource = rxResource({
    params: () => ({ query: this.searchValue() }),
    stream: ({ params: { query }, abortSignal }) => {
      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query,
        },
      });

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
