import { OptionStore, OptionState } from './optionStore';
import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OptionQuery extends QueryEntity<OptionState, any> {
  constructor(protected override store: OptionStore) {
    super(store);
  }
}
