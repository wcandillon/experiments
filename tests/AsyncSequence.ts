/// <reference path="../typings/tsd.d.ts" />
import Seq from "../lib/inputs/AsyncSequence";
import AsyncSequence from "../lib/inputs/AsyncSequence";
import Stream from "../lib/Stream";

describe("Basic Tests", () => {

    it("async seq", done => {
        let delayPromise = function(ms, value) {
            return new Promise(resolve => setTimeout(() => resolve(value), ms));
        };
        let allTheIntegers = function*() {
            for(let i=1; i<=5; i++) {
                yield delayPromise(25, i);
            }
        };
        let it = new Stream<number>(new AsyncSequence(allTheIntegers));
        let items = [];
        it.subscribe({
            next: item => {
                items.push(item);
            },
            return: () => {
                expect(items).toEqual([1, 2, 3, 4, 5]);
                done();
            },
            throw: error => {
                console.error(error);
                expect(false).toBe(true);
                done();
            }
        });
    });

    it("take(5)", done => {
        let delayPromise = function(ms, value) {
            return new Promise(resolve => setTimeout(() => resolve(value), ms));
        };
        let allTheIntegers = function*() {
            let i = 0;
            while(true) {
                yield delayPromise(25, ++i);
            }
        };
        let it = new Stream<number>(new AsyncSequence(allTheIntegers));
        let items = [];
        it.take(5).forEach(item => {
            items.push(item);
        }).return(() => {
            expect(items).toEqual([1, 2, 3, 4, 5]);
            done();
        });
    });

    it("filter(i > 2)", done => {
        let delayPromise = function(ms, value) {
            return new Promise(resolve => setTimeout(() => resolve(value), ms));
        };
        let allTheIntegers = function*() {
            let i = 0;
            while(true) {
                yield delayPromise(25, ++i);
            }
        };
        let it = new Stream<number>(new AsyncSequence(allTheIntegers));
        let items = [];
        it.take(5).filter(item => {
            return item > 2;
        }).forEach(item => {
            items.push(item);
        }).return(() => {
            expect(items).toEqual([3, 4, 5]);
            done();
        });
    });
});