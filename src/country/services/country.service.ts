import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, takeUntil, tap, throwError } from 'rxjs';
import { RESTCountry } from '../models/rest-country';
import { CountryMapper } from '../mappers/country-mapper';
import type { Country } from '../models/country';
import { Region } from '../models/region';

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

  capitalCacheMap = new Map<string, Country[]>();
  countryCacheMap = new Map<string, Country[]>();
  regionCacheMap = new Map<string, Country[]>();

  getByCapital(capital: string, abortSignal: AbortSignal) {
    const lowerCaseCapital = capital.toLowerCase();

    if (this.capitalCacheMap.has(lowerCaseCapital)) {
      return of(this.capitalCacheMap.get(lowerCaseCapital));
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${lowerCaseCapital}`).pipe(
      takeUntil(fromAbortSignal(abortSignal)),
      map(CountryMapper.mapRestCountriesToCountries),
      tap((countries) => this.capitalCacheMap.set(lowerCaseCapital, countries)),
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

    if (this.countryCacheMap.has(lowerCaseCountry)) {
      return of(this.countryCacheMap.get(lowerCaseCountry));
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${lowerCaseCountry}`).pipe(
      takeUntil(fromAbortSignal(abortSignal)),
      map(CountryMapper.mapRestCountriesToCountries),
      tap((countries) => this.countryCacheMap.set(lowerCaseCountry, countries)),
      catchError((error) => {
        console.error(error);
        return throwError(
          () => new Error(`Error occured when getting countries for country: ${country}`),
        );
      }),
    );
  }

  getByRegion(region: Region, abortSignal: AbortSignal) {
    const lowerCaseRegion = region.toLowerCase();

    if (this.regionCacheMap.has(lowerCaseRegion)) {
      return of(this.regionCacheMap.get(lowerCaseRegion));
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${lowerCaseRegion}`).pipe(
      takeUntil(fromAbortSignal(abortSignal)),
      map(CountryMapper.mapRestCountriesToCountries),
      tap((countries) => this.regionCacheMap.set(lowerCaseRegion, countries)),
      catchError((error) => {
        console.error(error);
        return throwError(
          () => new Error(`Error occured when getting countries for region: ${region}`),
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
