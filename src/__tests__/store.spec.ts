import {Action, combinedReducers, Reducer, Store} from '../store';
import * as Rx from 'rxjs';

interface TestState {
    count: number;
}

enum TestAction {
    Add,
    Minus
}

const addReducer: Reducer<TestState, TestAction> = (prev: TestState, action: Action<TestAction>) => {
    switch (action.type) {
        case TestAction.Add:
            return {count: prev.count + 1};
        default:
            return prev;
    }
};

describe('Store', () => {
    it('lets you dispatch actions', (done) => {

        const store = new Store<TestState, TestAction>(addReducer, {count: 0});

        store.getState$().subscribe(
            (state) => {
                expect(state.count).toEqual(1);
                done();
            },
            err => {
                fail(err);
            }
        );

        store.dispatch({type: TestAction.Add});
    });

    it('lets you dispatch multiple actions', (done) => {

        const store = new Store<TestState, TestAction>(addReducer, {count: 0});

        store.getState$().skip(2).subscribe(
            (state) => {
                expect(state.count).toEqual(3);
                done();
            },
            err => {
                fail(err);
            }
        );

        store.dispatch({type: TestAction.Add});
        store.dispatch({type: TestAction.Add});
        store.dispatch({type: TestAction.Add});
    });

    it('lets you dispatch actions before subscribing', (done) => {

        const store = new Store<TestState, TestAction>(addReducer, {count: 0});

        store.dispatch({type: TestAction.Add});
        store.dispatch({type: TestAction.Add});

        store.getState$().subscribe(
            (state) => {
                expect(state.count).toEqual(2);
                done();
            },
            err => {
                fail(err);
            }
        );

    });

    it('lets you have multiple subscribers', (done) => {
        const store = new Store<TestState, TestAction>(addReducer, {count: 0});

        Rx.Observable.zip(store.getState$(), store.getState$())
            .subscribe(
                (states) => {
                    expect(states.length).toEqual(2);
                    expect(states[1].count).toEqual(1);
                    done();
                }
            );

        store.dispatch({type: TestAction.Add});
    });

    it('lets you dispatch async actions', (done) => {

        const store = new Store<TestState, TestAction>(addReducer, {count: 0});

        store.getState$().subscribe(
            (state) => {
                expect(state.count).toEqual(1);
                done();
            },
            err => {
                fail(err);
            }
        );

        store.dispatch(() => {
            return Rx.Observable.timer(1)
                .take(1)
                .map(x => ({type: TestAction.Add}));
        });
    });

    it('lets you dispatch async actions before subscribing', (done) => {

        const store = new Store<TestState, TestAction>(addReducer, {count: 0});

        store.dispatch(() => {
            return Rx.Observable.timer(1)
                .take(1)
                .map(x => ({type: TestAction.Add}));
        });

        store.getState$().subscribe(
            (state) => {
                expect(state.count).toEqual(1);
                done();
            },
            err => {
                fail(err);
            }
        );
    });

    it('lets you dispatch multiple async actions', (done) => {

        const store = new Store<TestState, TestAction>(addReducer, {count: 0});

        store.getState$().skip(2).subscribe(
            (state) => {
                expect(state.count).toEqual(3);
                done();
            },
            err => {
                fail(err);
            }
        );

        store.dispatch(() => {
            return Rx.Observable.timer(1)
                .take(1)
                .map(x => ({type: TestAction.Add}));
        });


        store.dispatch(() => {
            return Rx.Observable.timer(1)
                .take(1)
                .map(x => ({type: TestAction.Add}));
        });


        store.dispatch(() => {
            return Rx.Observable.timer(1)
                .take(1)
                .map(x => ({type: TestAction.Add}));
        });
    });
});

interface ComplexTestState {
    simple: TestState;
    other: number;
}

describe('combinedReducers', () => {

    it('lets you combine multiple reducers into one', (done) => {

        const combinedReducer = combinedReducers<ComplexTestState, TestAction>({
            simple: addReducer,
            other: (prev: number, action: Action<TestAction>) => {
                switch (action.type) {
                    case TestAction.Minus:
                        return prev - 1;
                    default:
                        return prev;
                }
            }
        })

        const store = new Store<ComplexTestState, TestAction>(combinedReducer, {simple: {count: 0}, other: 0});

        store.getState$().subscribe(
            (state) => {
                expect(state.simple.count).toEqual(0);
                expect(state.other).toEqual(-1);
                done();
            },
            err => {
                fail(err);
            }
        );

        store.dispatch({type: TestAction.Minus});
    });

    it('lets you combine multiple reducers into one which all get called', (done) => {

        const combinedReducer = combinedReducers<ComplexTestState, TestAction>({
            simple: addReducer,
            other: (prev: number, action: Action<TestAction>) => {
                switch (action.type) {
                    case TestAction.Minus:
                        return prev - 1;
                    default:
                        return prev;
                }
            }
        })

        const store = new Store<ComplexTestState, TestAction>(combinedReducer, {simple: {count: 0}, other: 0});

        store.getState$().skip(1).subscribe(
            (state) => {
                expect(state.simple.count).toEqual(1);
                expect(state.other).toEqual(-1);
                done();
            },
            err => {
                fail(err);
            }
        );

        store.dispatch({type: TestAction.Add});
        store.dispatch({type: TestAction.Minus});
    });
});
