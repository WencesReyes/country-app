import { Country } from '../models/country';
import { RESTCountry } from '../models/rest-country';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.name.common,
      capital: restCountry.translations['spa'].official ?? restCountry.capital.join(','),
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion,
    };
  }

  static mapRestCountriesToCountries = (restCountries: RESTCountry[]): Country[] => {
    return restCountries.map(this.mapRestCountryToCountry);
  };
}
