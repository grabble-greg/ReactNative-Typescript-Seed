import {CounterAction} from '../enums/counter-action';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {CounterView} from '../views/counter-view';
import {Intent} from './intent';


export class CounterIntent implements Intent<CounterView, CounterAction> {

    public observe(view: CounterView): Observable<CounterAction> {
        return Observable.merge(
            view.incrementButton.map(() => CounterAction.Increment),
            view.decrementButton.map(() => CounterAction.Decrement)
        );
    }
}
