import HomeView from '../views/counter-view';
import {Subject} from 'rxjs/Subject';
import ActionEvent from '../action-event';
import {CounterAction} from '../constants/counter-action';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';


export default class CounterIntent {
    private actionsSubject: Subject<ActionEvent<CounterAction, void>>;

    constructor() {
        this.actionsSubject = new Subject<ActionEvent<CounterAction, void>>();
    }

    get actions(): Observable<ActionEvent<CounterAction, void>> {
        return this.actionsSubject.asObservable();
    }

    public observe(homeView: HomeView) {
        Observable.merge(
            homeView.incrementButton.map(() => CounterAction.Increment),
            homeView.decrementButton.map(() => CounterAction.Decrement))
            .subscribe((counterAction: CounterAction) => {
                this.actionsSubject.next(new ActionEvent<CounterAction, void>(counterAction, void 0))
            });
    }
}
