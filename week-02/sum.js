// 方法 1：使用 reduce
function sum1(ary) {
    console.log('方法 1 : 使用 reduce');
    // reduce 方法對 array 中的每個元素執行一個 reducer 函數(傳入四個參數：紀錄累加的值（累加器） accumulator，當前值 currentValue，當前索引 index，原本的陣列 array)
    // 將其結果彙總為單個返回值。
    return ary.reduce((acc, curr) => acc + curr, 0);
    // acc: 累加器，保存上一次調用回調時的返回值（或者初始值）
    // curr:  array 中正在處理的元素
    // 0: 初始值，如果沒有提供初始值，則使用 array 中的第一個元素
    // reduce 會將每個元素與累加器相加，最終返回總和
}

// 方法 2：使用 forEach
function sum2(ary) {
    console.log('方法 2 : 使用 forEach');
    let total = 0;
    // forEach 方法對 array 的每個元素執行一次給定的函數
    ary.forEach(num => {
        // 這個函數接收三個參數：當前元素，元素 index，原 array 
        // 這裡我們只使用了當前元素 (num)
        total += num;
    });
    // forEach 本身不 return 值，我們在 total 中累加結果
    return total;
}

// 方法 3：使用 map 和 reduce
function sum3(ary) {
    console.log('方法 3 : 使用 map 和 reduce');
    // map 方法創建一個新陣列，其結果是該陣列中的每個元素都呼叫一次提供的函數後的 return value
    return ary.map(x => {
        // 這裡的箭頭函數 x => x 實際上沒有改變任何值，只是為了演示 map 的用法
        // 在實際應用中，我們可能會在這裡進行一些轉換
        console.log(`目前處理的元素是：${x}`);
        return x;
    }).reduce((a, b) => a + b, 0);
    // 然後我們在映射後的 array 上使用 reduce 來計算總和
    // 方法有點多此一舉，但是是因爲目前的 function 太過簡單，請看 testofMapandReduce.js 中的更複雜的例子
}

// 測試
console.log(sum1([1, 5, 3, 2])); // 11
console.log(sum2([1, 5, 3, 2])); // 11
console.log(sum3([1, 5, 3, 2])); // 11

// 挑戰題：計算 1 到 n 的和
function sumToN(n) {
    // Array.from 方法用於從類 array 對象或可迭代對象創建一個新的 array 實例
    // 這裡我們使用它來創建一個長度為 n 的 array 
    return Array.from(
        // 第一個參數：一個具有 length 屬性的對象
        {length: n},
        // 第二個參數：一個 map 函數，用於填充 array 
        (_, i) => {
            // _: 表示當前元素的值。在這個情況下，它是 undefined，因為我們的第一個參數是 {length: n} 沒有定義任何實際的元素值
            // i: 當前的索引
            console.log(`當前元素值: ${_}, 當前索引: ${i}`);
            return i + 1; // 返回索引加1，以生成 1 到 n 的序列
        }
    ).reduce((a, b) => a + b, 0);
}

console.log(sumToN(4)); // 10 (1 + 2 + 3 + 4)
console.log(sumToN(100)); // 5050