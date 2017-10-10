import {ActionPayload, SimpleAction} from '../action-payload';
import {Observable} from 'rxjs/Observable';

// TView is separate as we need to be able to expose explicit getters for our intent to bind on to
export interface Intent<TView, TAction, TPayload> {
    readonly actions: Observable<ActionPayload<TAction, TPayload> | SimpleAction<TAction>>;
    observe(view: TView): void;
}

export interface SimpleIntent<TView, TAction> extends Intent<TView, TAction, void>{}
