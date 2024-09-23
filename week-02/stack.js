// stack.js
// 實現 Stack 資料結構並以 ESM 方式匯出

export default class Stack {
    // '#' 在 JavaScript 中表示私有字段（private field）
    // 這意味著 #items 只能在類內部訪問，不能從外部直接訪問或修改
    #items;
  
    constructor() {
      this.#items = [];
    }
  
    // 在 stack 頂部加入元素
    push(element) {
      this.#items.push(element);
    }
  
    // 移除並回傳 stack 頂部的元素
    pop() {
      if (this.isEmpty()) {
        return undefined;
      }
      return this.#items.pop();
    }
  
    // 回傳 stack 頂部的元素，但不移除它
    peek() {
      if (this.isEmpty()) {
        return undefined;
      }
      return this.#items[this.#items.length - 1];
    }
  
    // 檢查 stack 是否為空
    isEmpty() {
      return this.#items.length === 0;
    }
  
    // 回傳 stack 中元素的個數
    size() {
      return this.#items.length;
    }
  
    // 清空 stack 
    clear() {
      this.#items = [];
    }
  
    // 印出 stack 內容
    print() {
      console.log(this.#items.toString());
    }
  }