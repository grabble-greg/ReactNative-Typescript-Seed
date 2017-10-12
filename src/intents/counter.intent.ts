import {CounterAction} from '../enums/counter.action';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {Counter} from '../component/counter.component';
import {Intent} from '../util/intent';


export class CounterIntent implements Intent<Counter, CounterAction> {

    public observe(view: Counter): Observable<CounterAction> {
        return Observable.merge(
            view.incrementButton.map(() => CounterAction.Increment),
            view.decrementButton.map(() => CounterAction.Decrement)
        );
    }
}
