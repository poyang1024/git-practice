// 使用 map 和 reduce 的其他案例
// 1. 簡單求和：只使用 reduce
function simpleSum(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
}

// 2. 求平方和：使用 map 和 reduce
function sumOfSquares(arr) {
    return arr
        .map(num => num * num)
        .reduce((sum, square) => sum + square, 0);
}

// 3. 複雜場景：計算購物車總價
const shoppingCart = [
    { name: "書", price: 10, quantity: 2 },
    { name: "筆", price: 1, quantity: 10 },
    { name: "包", price: 50, quantity: 1 }
];

function calculateTotal(cart) {
    return cart
        .map(item => item.price * item.quantity)
        .reduce((total, itemTotal) => total + itemTotal, 0);
}

console.log("簡單求和:", simpleSum([1, 2, 3, 4, 5]));
console.log("平方和:", sumOfSquares([1, 2, 3, 4, 5]));
console.log("購物車總價:", calculateTotal(shoppingCart));

// 4. 使用 reduce 完成 map 和 reduce 的功能
function mapReduceWithReduce(arr) {
    return arr.reduce((acc, num) => {
        return acc + num * num;
    }, 0);
}

console.log("使用單個 reduce 計算平方和:", mapReduceWithReduce([1, 2, 3, 4, 5]));

// 5. 性能測試
function performanceTest() {
    const largeArray = Array.from({ length: 1000000 }, (_, i) => i + 1);
    
    console.time('Single Reduce');
    mapReduceWithReduce(largeArray);
    console.timeEnd('Single Reduce');

    console.time('Map and Reduce');
    sumOfSquares(largeArray);
    console.timeEnd('Map and Reduce');
    
}

performanceTest();