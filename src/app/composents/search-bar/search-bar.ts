import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { Auto } from '../../interfaces/auto';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-search-bar',
  styleUrl: './search-bar.css',
  templateUrl: './search-bar.html',
})
export class SearchBar {
  faMagnifyingGlass = faMagnifyingGlass;

  @Output() onSelectCar = new EventEmitter<Auto>();
  selectedAutos: Auto[] = [];

  @Input()
  set autos(value: Auto[]) {
    this._autos = value;
    this.selectedAutos = value;
  }

  get autos(): Auto[] {
    return this._autos;
  }

  private _autos: Auto[] = [];

  selectAuto(searchValue: string) {
    const search = searchValue.trim().toLowerCase();

    if (search) {
      this.selectedAutos = this.autos.filter(
        auto =>
          `${auto.brand} ${auto.model}`.toLowerCase().includes(search),
      );
    } else {
      this.selectedAutos = this.autos;
    }
  }

  selectCar(auto: Auto) {
    this.onSelectCar.emit(auto);
  }
}