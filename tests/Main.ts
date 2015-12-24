/// <reference path="../typings/tsd.d.ts" />
import Add from "../lib/Add";
import Range from "../lib/Range";
import Seq from "../lib/Seq";
import Apply from "../lib/Apply";

describe("Basic Tests", () => {
    it("add(1, 1)", done => {
        let result;
        let it = new Add(new Seq([1]), new Seq([1]));
        it.subscribe({
            next: item => {
                result = item;
            },
            return: () => {
                expect(result).toEqual(2);
                done();
            },
            throw: error => { throw error; }
        });
    });

    it("range(1, 10)", done => {
        let items = [];
        let it = new Range(new Seq([1]), new Seq([10]));
        it.subscribe({
            next: item => {
                items.push(item);
            },
            return: () => {
                expect(items).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
                done();
            },
            throw: error => { throw error; }
        });
    });

    it("range(1, add(5, 5)) 1", done => {
        let items = [];
        let it = new Range(new Seq([1]), new Add(new Seq([5]), new Seq([5])));
        it.subscribe({
            next: item => {
                items.push(item);
            },
            return: () => {
                expect(items).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
                done();
            },
            throw: error => { throw error; }
        });
    });

    it("add(5, 5)", done => {
        let add = (left, right) => [left + right];
        let result;
        let it = new Apply(add, [new Seq([5]), new Seq([5])]);
        it.subscribe({
            next: item => {
                result = item;
            },
            return: () => {
                expect(result).toEqual(10);
                done();
            },
            throw: error => { throw error; }
        });
    });

    it("range(1, add(5, 5)) 2", done => {
        let add = (left, right) => [left + right];
        let range = (from, to) => {
            let result = [];
            for(let i = from; i <= to; i++) {
                result.push(i);
            }
            return result;
        };
        let items = [];
        let it = new Apply(range, [new Seq([1]), new Apply(add, [new Seq([5]), new Seq([5])])]);
        it.subscribe({
            next: item => {
                items.push(item);
            },
            return: () => {
                expect(items).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
                done();
            },
            throw: error => { throw error; }
        });
    });
});



