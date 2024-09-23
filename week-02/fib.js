function fib(n) {
    // 基本情況：第 0 個和第 1 個費波納契數
    // 遞迴情況下須設定終止條件
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    // 遞迴計算
    return fib(n - 1) + fib(n - 2);
  }
  
  // 測試
  console.log(fib(0));  // 0
  console.log(fib(1));  // 1
  console.log(fib(5));  // 5
  console.log(fib(10)); // 55