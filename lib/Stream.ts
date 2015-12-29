import {Observable} from "./Observable";
import Pipe from "./inputs/Pipe";
import {Observer} from "./Observer";
import Subscription from "./Subscription";
import MultiplexerSubscription from "./MultiplexerSubscription";

export default class Stream<T> {

    private input: Observable<T>;

    constructor(input: Observable<T>) {
        this.input = input;
    }

    forEach(cb): Stream<T> {
        let pipe = new Pipe<T>();
        let sub = this.input.subscribe({
            next: (item) => {
                cb(item);
                pipe.next(item);
            },
            throw: error => pipe.throw(error),
            return: () => pipe.return()
        });
        pipe.setSubscription(sub);
        return new Stream<T>(pipe);
    }

    map(cb): Stream<T> {
        let pipe = new Pipe<T>();
        let sub = this.input.subscribe({
            next: (item) => {
                pipe.next(cb(item));
            },
            throw: error => pipe.throw(error),
            return: () => pipe.return()
        });
        pipe.setSubscription(sub);
        return new Stream<T>(pipe);
    }

    skip(n: number): Stream<T> {
        let i = 0;
        let pipe = new Pipe<T>();
        let sub = this.input.subscribe({
            next: item => {
                i++;
                if(i > n) {
                    pipe.next(item);
                }
            },
            throw: error => pipe.throw(error),
            return: () => pipe.return()
        });
        pipe.setSubscription(sub);
        return new Stream<T>(pipe);
    }

    take(n: number): Stream<T> {
        let i = 0;
        let pipe = new Pipe<T>();
        let sub = this.input.subscribe({
            next: item => {
                i++;
                if(i > n) {
                    sub.unsubscribe();
                } else {
                    pipe.next(item);
                }
            },
            throw: error => pipe.throw(error),
            return: () => pipe.return()
        });
        pipe.setSubscription(sub);
        return new Stream<T>(pipe);
    }

    filter(cb): Stream<T> {
        let pipe = new Pipe<T>();
        let sub = this.input.subscribe({
            next: item => {
                if(cb(item) === true) {
                    pipe.next(item);
                }
            },
            throw: error => pipe.throw(error),
            return: () => pipe.return()
        });
        pipe.setSubscription(sub);
        return new Stream<T>(pipe);
    }

    subscribe(observer: Observer<T>): Subscription {
        return this.input.subscribe(observer);
    }

    return(cb): Stream<T> {
        this.input.subscribe({
            next: item => {},
            throw: error => {},
            return: cb
        });
        return this;
    }

    static combine(fn, fnArgs: Stream<any>[]): Stream<any> {
        let done = 0;
        let pipe = new Pipe<any>();
        let args = [];
        let subs = [];
        let argsAreReady = args => {
            let ready = true;
            args.forEach(arg => {
                if(arg[0] === undefined) {
                    ready = false;
                }
            });
            return ready;
        };
        let getArgs = args => {
            let result = [];
            args.forEach(arg => {
                result.push(arg.splice(0, 1)[0]);
            });
            return result;
        };
        for(let i=0; i < fnArgs.length; i++) {
            args.push([]);
            let sub = fnArgs[i]
            .forEach(item => {
                args[i].push(item);
                if(argsAreReady(args)) {
                    pipe.next(fn.apply(fn, getArgs(args)));
                }
            })
            .subscribe({
                next: item => {},
                throw: error => pipe.throw(error),
                return: () => {
                    done++;
                    if(done === fnArgs.length) {
                        pipe.return();
                    }
                }
            });
            subs.push(sub);
        }
        pipe.setSubscription(new MultiplexerSubscription(subs));
        return new Stream(pipe);
    }
}