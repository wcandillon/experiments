import {Observer} from "./Observer";
import {Observable} from "./Observable";

export default class Seq implements Observable {

    private items: any[];

    constructor(items: any[]) {
        this.items = items;
    }

    subscribe(observer: Observer): void {
        this.items.forEach(item => {
           observer.next(item);
        });
        observer.return();
    }
}
