export class ActionPayload<A, D> {
    constructor(readonly action: A, readonly data: D) {
    }
}

export class SimpleAction<A> extends ActionPayload<A, void> {
    constructor(action: A) {
        super(action, void 0);
    }
}
