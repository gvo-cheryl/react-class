let count = 0;
count +=1;

const message: string = "hello world";
const done: boolean = false;

const numbers: number[] = [1,2,3];
const messages: string[] = ["hello", "world"];

let mightBeUndefined: string | undefined = "undefined";
let nullableNumber: number | null = null;

let color: "red" | "orange" | "yellow" = "red";


function sum(x: number, y: any): number{
    return x+y;
}
console.log(sum(1, "string")); //1string 


function sumArray(numberes:number[]) : number {
    return numberes.reduce((acc, current)=> acc+current, 0);
}

const total = sumArray([1,2,3,4,5]);
console.log(total) //15

function returnNothing():void {
    console.log("returnNothing");
}

function returnStringOrNumber():string | number {
    return 1;
}


//Generic : 지정된 타입 확인 가능 
function merge<T1,T2>(a:T1, b:T2) {
    return {
        ...a,
        ...b
    }
}

const merged = merge({foo:1}, {bar:2, foobar: 3});

function wrap<T>(param:T){
    return {
        param
    }
}

const wrapped = wrap('aaa');
wrapped.param


interface Items<T> {
    list: T[]
}

type ItemsType<T, V> = {
    list: T[],
    value: V
}

const items: ItemsType<string, number> = {
    list: ['a', 'b', 'c'],
    value: 123
}

class Queue<T> {
    list: T[] = [];
    get length(){
        return this.list.length;
    }
    enqueue(item:T){
        this.list.push(item);
    }
    dequeue(){
        return this.list.shift();
    }
}

const queue = new Queue<number>();
queue.enqueue(0);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);

while(queue.length >0) {
    console.log(queue.dequeue());
}