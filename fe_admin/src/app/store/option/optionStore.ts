import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface OptionState extends EntityState<any> { }

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'Options' })
export class OptionStore extends EntityStore<OptionState, any> {

}
