
import HomeIntent from '../intents/counter-intent';
import {CounterAction} from '../constants/counter-action';
import ActionEvent from '../action-event';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';


export interface CounterState {
    count: number;
}

export default class CounterModel {
    private updateSubject: Subject<CounterState>;
    private currentState: CounterState;

    constructor() {
        this.currentState = {count: 0} as CounterState;
        this.updateSubject = new Subject<CounterState>();
    }

    get updates(): Observable<CounterState> {
        return this.updateSubject
            .asObservable()
            .startWith({count: 0} as CounterState);
    }

    public observe(homeIntent: HomeIntent) {
        homeIntent.actions.subscribe(
            (intent: ActionEvent<CounterAction, void>) => {
                switch (intent.action) {
                    case CounterAction.Decrement:
                        this.currentState = {count: this.currentState.count - 1} as CounterState;
                        this.updateSubject.next(this.currentState);
                        break;
                    case CounterAction.Increment:
                        this.currentState = {count: this.currentState.count + 1} as CounterState;
                        this.updateSubject.next(this.currentState);
                        break;
                    default:
                        throw new Error(`Unhandled counter intent: ${intent.action}`);
                }
            }
        );

    }
}
