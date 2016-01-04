import Stream from "./Stream";

export default class TupleStream extends Stream {
    constructor() {
        super(new EmptySequence());
    }

    forBinding(varName: string, expr) {

    }

}