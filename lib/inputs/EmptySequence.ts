import {Observable} from "../Observable";
import {Observer} from "../Observer";
import Subscription from "../Subscription";

export default class EmptySequence implements Observable<any> {

    subscribe(observer: Observer<any>): Subscription {
        let sub = new Subscription();
        Promise.resolve().then(() => observer.return());
        return sub;
    }
}