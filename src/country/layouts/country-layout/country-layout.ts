import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountryTopMenu } from '../../components/country-top-menu/country-top-menu';

@Component({
  selector: 'app-country-layout',
  imports: [RouterOutlet, CountryTopMenu],
  templateUrl: './country-layout.html',
})
export class CountryLayout {}
