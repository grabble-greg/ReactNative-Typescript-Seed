import {Subject} from 'rxjs/Subject';
import {ActionPayload, SimpleAction} from '../action-payload';
import {CounterAction} from '../constants/counter-action';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {SimpleIntent} from './intent';
import {CounterView} from '../views/counter-view';


export class CounterIntent implements SimpleIntent<CounterView, CounterAction>{
    private actionsSubject: Subject<SimpleAction<CounterAction>>;

    constructor() {
        this.actionsSubject = new Subject<SimpleAction<CounterAction>>();
    }

    get actions(): Observable<ActionPayload<CounterAction, void>> {
        return this.actionsSubject.asObservable();
    }

    public observe(view: CounterView) {
        Observable.merge(
            view.incrementButton.map(() => CounterAction.Increment),
            view.decrementButton.map(() => CounterAction.Decrement))
            .subscribe((counterAction: CounterAction) => {
                this.actionsSubject.next(new SimpleAction<CounterAction>(counterAction))
            });
    }
}
