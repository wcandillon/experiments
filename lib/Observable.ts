import {Observer} from "./Observer";

export interface Observable {
    subscribe(observer: Observer): void;
};