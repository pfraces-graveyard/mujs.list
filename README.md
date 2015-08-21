list
====

Collection of basic list-related utilities

API
---

### each

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

`each` can be used to find sequentially. If at any iteration the callback returns a non-`undefined`
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

### reduce

Reduces a list to a value accumulated by running each element through a supplied function

### indexOf

Gets the index at which the first occurrence of value is found

### contains

Checks if a given value is present in a list

### removeAt

Remove the item at the given index from a list

### remove

Remove the first occurrence of the supplied item
