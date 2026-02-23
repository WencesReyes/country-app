import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Error } from '../../../shared/components/error/error';
import { CountryInformation } from './country-information/country-information';

@Component({
  selector: 'app-country',
  imports: [Error, CountryInformation],
  templateUrl: './country.html',
})
export default class Country {
  code = inject(ActivatedRoute).snapshot.paramMap.get('code');

  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => ({ code: this.code ?? '' }),
    stream: ({ params: { code } }) => {
      return this.countryService.getByCode(code);
    },
  });
}
