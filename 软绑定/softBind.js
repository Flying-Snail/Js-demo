if (!Function.prototype.softBind) {
  Function.prototype.softBind = function softBind(obj) {
    // obj每次调用时都为第一次调用的参数，这里相当于obj1
    let fn = this;
    let curried = [].slice.call( arguments, 1);
    let bound = function () {
      // 这里a的意义是当this是默认绑定时绑定自己定义的默认绑定，否则，就按照后来定义的绑定规则绑定
      let a = (!this || this === (window || global)) ? obj : this;
      // b是默认绑定之后传入的参数
      let b = Array.prototype.slice(arguments);
      return fn.apply(a,b);
    };
    bound.prototype = Object.create(fn.prototype);
    return bound;
  }
}

function foo() {
  console.log(this.name);
}

let obj1 = {name: "obj1"},
    obj2 = {name: "obj2"};
    obj3 = {name: "obj3"}

// 这里进行了初值的设置
let fooOBJ = foo.softBind(obj1);
// 在这可能需要了解一下柯里化【柯南柯里化，了解一下：）】
// fooOBJ函数其实就是bound，这里this为window，所以默认绑定obj1
fooOBJ();

obj2.foo = foo.softBind(obj1);
// 根据上下文，这里this为obj2，所以绑定obj2
obj2.foo();

// this隐式丢失，软绑定obj1
setTimeout(obj2.foo,10);
