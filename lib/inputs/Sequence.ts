import {Observable} from "../Observable";
import {Observer} from "../Observer";
import Subscription from "../Subscription";

export default class Sequence<T> implements Observable<T> {

    private input;

    constructor(input) {
        this.input = input();
    }

    private pull(observer: Observer<T>, sub: Subscription) {
        let item;
        if((item = this.input.next().value) !== undefined && sub.isOpen()) {
            observer.next(item);
            this.pull(observer, sub);
        } else {
            observer.return();
        }
    }

    subscribe(observer: Observer<T>): Subscription {
        let sub = new Subscription();
        this.pull(observer, sub);
        return sub;
    }

    static from(input: any[]): Sequence<any> {
        return new Sequence<any>(function *(){
            yield *input;
        });
    }
}