export default class ActionEvent<A, D> {
    constructor(readonly action: A, readonly data: D) {
    }
}
