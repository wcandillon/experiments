import Add from "./Add";
import Item from "./Item";

let it = new Add(new Item([1]), new Item([1]));
it.subscribe({
    next: function(item){
        console.log(item);
    }
});