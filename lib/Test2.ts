import Range from "./Range";
import Item from "./Item";

let it = new Range(new Item([1]), new Item([10]));
it.subscribe({
    next: function(item){
        console.log(item);
    }
});