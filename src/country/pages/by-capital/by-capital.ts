import { Component, computed, effect, inject, linkedSignal, signal } from '@angular/core';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountrySearch } from '../../components/country-search/country-search';
import { CountryTable } from '../../components/country-table/country-table';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital',
  imports: [CountrySearch, CountryTable],
  templateUrl: './by-capital.html',
})
export class ByCapital {
  protected countryService = inject(CountryService);

  protected activactedRoute = inject(ActivatedRoute);
  protected router = inject(Router);
  protected queryParam = this.activactedRoute.snapshot.queryParamMap.get('query') ?? '';

  protected searchValue = linkedSignal(() => this.queryParam);

  countriesResource = rxResource({
    params: () => ({ query: this.searchValue() }),
    defaultValue: [],
    stream: ({ params: { query }, abortSignal }) => {
      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query,
        },
      });

      if (!query) {
        return of([]);
      }

      return this.countryService.getByCapital(query, abortSignal);
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

  // countries = toSignal(
  //   toObservable(this.searchValue).pipe(
  //     tap(() => {
  //       this.isLoading.set(true);
  //       this.hasError.set('');
  //     }),
  //     switchMap((value) =>
  //       this.countryService.getByCapital(value).pipe(
  //         catchError((error) => {
  //           console.error(error);

  //           this.hasError.set(`Error occured when getting countries for capital: ${value}`);
  //           return of([]);
  //         }),
  //       ),
  //     ),
  //     tap((countries) => {
  //       this.isLoading.set(false);
  //       console.log(countries);
  //     }),
  //   ),
  //   { initialValue: [] },
  // );
}
