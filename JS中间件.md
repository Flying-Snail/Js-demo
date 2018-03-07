# JS中间件
中间件模式（middleware）是一种很常见、也很强大的模式，被广泛应用在 Express、Koa、Redux 等类库和框架当中。

简单来说，中间件就是在调用目标函数之前，你可以随意插入其他函数预先对数据进行处理、过滤，在这个过程里面你可以打印数据、或者停止往下执行中间件等。
数据就像水流一样经过中间件的层层的处理、过滤，最终到达目标函数。

```
let app = new Middleware();

app.use((arg, next) => {
  arg.first = '我是第一个中间件';
  next()
})

app.use((arg, next) => {
  console.log(arg.first);
  arg.sec = '我是第二个中间件';
  next()
})

app.use((arg, next) => {
  console.log(`我下面就要调用callback了！`);
  next()
})

// ... 任意调用 use 插入中间件

app.go({}) // => 启动执行，最后会调用 callback 打印 {first:"我是第一个中间件",sec:"我是第二个中间件"}
```

## Middleware类在这里！

```
/**
 * app.use 为中间件，参数为一个函数fn，fn有两个参数，go传递进的参数和next，fu函数尾要调用next函数。
 * 形式为：
 * app.
 * app.go()为触发函数，调用后会依次调用所有 有next的中间件，只接受一个参数
 */

/**
 * 关于reduce函数：
 * arr.reduce(callback[, initialValue])
 * 
 * callback
 *  执行数组中每个值的函数，包含四个参数：
 *  accumulator
 *   累加器累加回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue
 *  currentValue
 *   数组中正在处理的元素。
 *  currentIndex 可选
 *   数组中正在处理的当前元素的索引。 如果提供了initialValue，则索引号为0，否则为索引为1。
 *  array 可选
 *   调用reduce的数组
 * 
 * initialValue 可选
 *  用作第一个调用 callback的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。
 * 在没有初始值的空数组上调用 reduce 将报错。
 */

class Middleware {
  constructor() {
    this.middlds = [];
  }

  callback (arg) {
    console.log(arg);
  }
  
  use (fn) {
    this.middlds.push(fn)
  }
  
  go (arg) {
    // next是上一次调用回调的返回值，或提供的初值
    // fn: 当前被处理的元素
    const reducer = (next, fn) => () => fn(arg, next);
    this.middlds.reduceRight(reducer, () => this.callback(arg))();
  }
};
```
## 分析：

arg 参数就是 app.go 接受的对象。调用 app.go 其实会调用目标函数 app.callback，但是调用 app.callback 之前我们可以先让参数 arg 通过一系列的中间件，最后才会传递给 app.callback。

使用 app.use 插入任意中间件，中间件是一个函数，可以被传入一个 arg 和 next；调用 next 的时候会执行下一个中间件。如果不调用 next 会阻止接下来所有的中间件的执行，也不会执行 app.callback。

因为要考虑next，所以我们要把下一个中间件函数赋给当前中间件的next，然后在当前中间件尾调用。【相当于把后者赋给前者】所以我们要从后向前遍历，使用reduceRight函数，从后向前遍历meddle[]数组，数组的每个值的返回值都是一个函数，把这个函数传给上一个值的next参数。

这样，新生成的数组的第一个值就是第一个要执行的中间件，next连接到下一个中间件。因为reduceRight()最后一个返回的值就是第一个中间件函数，所以让这个函数自执行就完成了整个过程。
