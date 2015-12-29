import {Observable} from "../Observable";
import {Observer} from "../Observer";
import Subscription from "../Subscription";

export default class Pipe<T> implements Observable<T>, Observer<T> {

    private observer: Observer<T>;
    private subscription: Subscription;

    constructor() {}

    setSubscription(subscription: Subscription): Pipe<T> {
        this.subscription = subscription;
        return this;
    }

    subscribe(observer: Observer<T>): Subscription {
        this.observer = observer;
        return this.subscription;
    }

    next(item: T) {
        this.observer.next(item);
    }

    throw(error: Error) {
        this.observer.throw(error);
    }

    return() {
        this.observer.return();
    }
}