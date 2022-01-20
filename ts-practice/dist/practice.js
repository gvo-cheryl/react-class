"use strict";
let count = 0;
count += 1;
const message = "hello world";
const done = false;
const numbers = [1, 2, 3];
const messages = ["hello", "world"];
let mightBeUndefined = "undefined";
let nullableNumber = null;
let color = "red";
function sum(x, y) {
    return x + y;
}
console.log(sum(1, "string")); //1string 
function sumArray(numberes) {
    return numberes.reduce((acc, current) => acc + current, 0);
}
const total = sumArray([1, 2, 3, 4, 5]);
console.log(total); //15
function returnNothing() {
    console.log("returnNothing");
}
function returnStringOrNumber() {
    return 1;
}
//Generic : 지정된 타입 확인 가능 
function merge(a, b) {
    return Object.assign(Object.assign({}, a), b);
}
const merged = merge({ foo: 1 }, { bar: 2, foobar: 3 });
function wrap(param) {
    return {
        param
    };
}
const wrapped = wrap('aaa');
wrapped.param;
const items = {
    list: ['a', 'b', 'c'],
    value: 123
};
class Queue {
    constructor() {
        this.list = [];
    }
    get length() {
        return this.list.length;
    }
    enqueue(item) {
        this.list.push(item);
    }
    dequeue() {
        return this.list.shift();
    }
}
const queue = new Queue();
queue.enqueue(0);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
while (queue.length > 0) {
    console.log(queue.dequeue());
}
