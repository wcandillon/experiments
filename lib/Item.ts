import {Observer} from "./Observer";
import {Observable} from "./Observable";

export default class Item implements Observable {

    private item: any[];

    constructor(item: any[]) {
        this.item = item;
    }

    subscribe(observer: Observer): void {
        observer.next(this.item);
    }
}
