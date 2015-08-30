list
====

Collection of basic list-related utilities

API
---

### `each(list, fn (item, index) {})`

Iterate over arrays or objects

```js
each([1, 5, 7], function (item, index) {
  console.log(index, item);
});
```

```
> 0 1
  1 5
  2 7
```

```js
each({ a: 1, b: 2, c: 3 }, function (item, index) {
  console.log(index, item);
});
```

```
> a 1
  b 2
  c 3
```

`each` can be used to find sequentially. At any iteration in which the callback returns a non-`undefined`
value, the iteration is broken and `each` returns that value

```js
var indexOf = function (list, value) {
  return each(list, function (item, index) {
    if (item === value) { return index; }
  });  
};

console.log(indexOf({
  foo: 100,
  bar: 200,
  qux: 300
}, 200));
```

```
> bar
```

### map

Creates an array of values by running each element in an array or object through the callback

### filter

Creates a list of those items from the provided list whose value applied to the callback is truthy

### `reduce(list, acc, fn (acc, item, index) {})`

Reduces a list to a value accumulated by running each element through a supplied function

```js
var sum = function (a, b) { return a + b; };
console.log(reduce([1, 2, 3], 0, sum));
```

```
> 6
```

### copy

Creates a duplicate of the provided list. Non-scalar values are copied by
reference

```js
var points = [{ x: 10, y: 20 }],
    pointsCopy = copy(points);

console.log(points[0] === pointsCopy[0]);
```

```
> true
```

### indexOf

Gets the index at which the first occurrence of value is found

```js
var a = { x: 1, y: 1 },
    b = { x: 2, y: 2 },
    c = { x: 3, y: 3 };

var points = [a, b, c];

console.log(indexOf(points, b));
```

```
> 1
```

### contains

Checks if a given value is present in a list

```js
var a = { x: 1, y: 1 },
    b = { x: 2, y: 2 },
    c = { x: 3, y: 3 };

var points = [a, b, c];

console.log(contains(points, b));
console.log(contains(points, { x: 2, y: 2 });
```

```
> true
  false
```

### removeAt

Remove the item at the given index from a list

### remove

Remove the first occurrence of the supplied item
