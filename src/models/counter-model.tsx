
import {CounterIntent} from '../intents/counter-intent';
import {CounterAction} from '../constants/counter-action';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Model} from './model';
import {SimpleAction} from '../action-payload';


export interface CounterState {
    count: number;
}

export class CounterModel implements Model<CounterState, CounterIntent> {
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

    public observe(intent: CounterIntent) {
        intent.actions.subscribe(
            (intent: SimpleAction<CounterAction>) => {
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
