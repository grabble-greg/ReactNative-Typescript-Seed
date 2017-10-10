import {Observable} from 'rxjs/Observable';

// Interface defining how view events get picked up and transformed into events that the system uses
export interface Intent<TView, TEvent> {
    observe(view: TView): Observable<TEvent>;
}
