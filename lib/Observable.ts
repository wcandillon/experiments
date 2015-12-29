import {Observer} from "./Observer";
import Subscription from "./Subscription";

export interface Observable<T> {
    subscribe(observer: Observer<T>): Subscription;
};