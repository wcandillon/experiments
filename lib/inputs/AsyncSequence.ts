import {Observable} from "../Observable";
import {Observer} from "../Observer";
import Subscription from "../Subscription";

export default class AsyncSequence<T> implements Observable<T> {

    private input;

    constructor(input) {
        this.input = input();
    }

    private pull(observer: Observer<T>, sub: Subscription) {
        let promise;
        if((promise = this.input.next().value) !== undefined && sub.isOpen()) {
            promise.then(item => {
                observer.next(item);
                this.pull(observer, sub);
            });
        } else {
            observer.return();
        }
    }

    subscribe(observer: Observer<T>): Subscription {
        let sub = new Subscription();
        this.pull(observer, sub);
        return sub;
    }
}