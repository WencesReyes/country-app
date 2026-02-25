import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'app-country-search',
  imports: [],
  templateUrl: './country-search.html',
})
export class CountrySearch {
  searchInputChanged = output<string>();
  placeholder = input.required<string>();
  debounceTime = input<number>(300);
  initialValue = input<string>('');

  inputValue = linkedSignal<string>(() => this.initialValue());

  onSearchInputChanged(value: string) {
    this.inputValue.set(value);
  }

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => this.searchInputChanged.emit(value), this.debounceTime());

    onCleanup(() => clearTimeout(timeout));
  });
}
