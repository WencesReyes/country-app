import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { CountryTable } from '../../components/country-table/country-table';
import { Region } from '../../models/region';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

function isRegion(val: string | null): val is Region {
  return ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic']
    .map((r) => r.toLowerCase())
    .includes(val?.toLowerCase() ?? '');
}

@Component({
  selector: 'app-by-region',
  imports: [CountryTable],
  templateUrl: './by-region.html',
})
export default class ByRegion {
  protected countryService = inject(CountryService);
  protected lastSelectedRegion = inject(ActivatedRoute).snapshot.queryParamMap.get('region');
  protected router = inject(Router);
  protected regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];
  protected selectedRegion = linkedSignal<Region | null>(() =>
    isRegion(this.lastSelectedRegion) ? this.lastSelectedRegion : null,
  );

  regionResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params: { region }, abortSignal }) => {
      this.router.navigate(['/country', 'by-region'], {
        queryParams: {
          region,
        },
      });

      if (!region) {
        return of([]);
      }

      return this.countryService.getByRegion(region, abortSignal);
    },
  });

  selectRegion(region: Region) {
    this.selectedRegion.set(region);
  }

  protected tableState = computed(() => ({
    countries: this.regionResource.error() ? [] : (this.regionResource.value() ?? []),
    isLoading: this.regionResource.isLoading(),
    error: this.regionResource.error(),
    isEmpty: this.regionResource.error() ? true : (this.regionResource.value() ?? []).length === 0,
  }));
}
