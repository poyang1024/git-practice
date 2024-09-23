// main.js
// 測試 Stack 類的實現

import Stack from './stack.js';

// 創建一個新的 Stack 實例
let stack = new Stack();

// 測試 isEmpty 和 size 方法（空 stack）
console.log("Is stack empty?", stack.isEmpty());  // 應該輸出 true
console.log("Stack size:", stack.size());  // 應該輸出 0

// 測試 push 方法和 print 方法
console.log("Pushing elements 5 and 8:");
stack.push(5);
stack.push(8);
stack.print();  // 應該輸出 5,8

// 測試 peek 方法
console.log("Top element:", stack.peek());  // 應該輸出 8

// 測試 pop 方法
console.log("Popped element:", stack.pop());  // 應該輸出 8
stack.print();  // 應該輸出 5

// 再次測試 isEmpty 和 size 方法（非空 stack）
console.log("Is stack empty?", stack.isEmpty());  // 應該輸出 false
console.log("Stack size:", stack.size());  // 應該輸出 1

// 測試 clear 方法
stack.clear();
console.log("After clear - Is stack empty?", stack.isEmpty());  // 應該輸出 true

// 測試 pop 和 peek 在空 stack 上的行為
console.log("Pop from empty stack:", stack.pop());  // 應該輸出 undefined
console.log("Peek from empty stack:", stack.peek());  // 應該輸出 undefined

// 測試多個元素的操作
console.log("Pushing multiple elements:");
stack.push(10);
stack.push(20);
stack.push(30);
stack.print();  // 應該輸出 10,20,30
console.log("Stack size:", stack.size());  // 應該輸出 3

// 測試連續 pop
console.log("Popping all elements:");
while (!stack.isEmpty()) {
    console.log("Popped:", stack.pop());
}
console.log("Is stack empty?", stack.isEmpty());  // 應該輸出 true