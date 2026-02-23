import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, takeUntil, throwError } from 'rxjs';
import { RESTCountry } from '../models/rest-country';
import { CountryMapper } from '../mappers/country-mapper';
import { Country } from '../models/country';

const API_URL = 'https://restcountries.com/v3.1';

function fromAbortSignal(signal: AbortSignal) {
  return new Observable((observer) => {
    if (signal.aborted) {
      observer.error(new DOMException('Aborted', 'AbortError'));
      return;
    }
    signal.addEventListener(
      'abort',
      () => {
        observer.error(new DOMException('Aborted', 'AbortError'));
      },
      { once: true },
    );
  });
}

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  http = inject(HttpClient);

  getByCapital(capital: string, abortSignal: AbortSignal) {
    const lowerCaseCapital = capital.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${lowerCaseCapital}`).pipe(
      takeUntil(fromAbortSignal(abortSignal)),
      map(CountryMapper.mapRestCountriesToCountries),
      catchError((error) => {
        console.error(error);
        return throwError(
          () => new Error(`Error occured when getting countries for capital: ${capital}`),
        );
      }),
    );
  }

  getByCountry(country: string, abortSignal: AbortSignal) {
    const lowerCaseCountry = country.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${lowerCaseCountry}`).pipe(
      takeUntil(fromAbortSignal(abortSignal)),
      map(CountryMapper.mapRestCountriesToCountries),
      catchError((error) => {
        console.error(error);
        return throwError(
          () => new Error(`Error occured when getting countries for country: ${country}`),
        );
      }),
    );
  }

  getByCode(code: string): Observable<Country | undefined> {
    if (!code) {
      return of(undefined);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map(CountryMapper.mapRestCountriesToCountries),
      map((countries) => countries.at(0)),
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error(`Error occured when getting country by code: ${code}`));
      }),
    );
  }
}
