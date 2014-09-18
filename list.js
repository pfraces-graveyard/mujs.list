define('mu.list', function (require) {
  'use strict';

  var is = require('mu.is');

  var iterateArray = function (list, fn) {
    for (var index = 0, len = list.length; index < len; index++) {
      var exit = fn(list[index], index);
      if (is.defined(exit)) { return exit; }
    }
  };
  
  var iterateObject = function (list, fn) {
    for (var prop in list) {
      var exit = fn(list[prop], prop);
      if (is.defined(exit)) { return exit; }
    }
  };
  
  var each = function (list, fn) {
    if (is.array(list)) { return iterateArray(list, fn); }
    return iterateObject(list, fn);
  };

  var map = function (list, fn) {
    var mapped = is.array(list) ? [] : {};
    
    each(list, function (item, index) {
      mapped[index] = fn(item, index);
    });

    return mapped;
  };

  var filter = function (list, fn) {
    var isArray = is.array(list),
        filtered = isArray ? [] : {};
    
    each(list, function (item, index) {
      if (!fn(item, index)) { return; }
      index = isArray ? filtered.length : index;
      filtered[index] = item;
    });
    
    return filtered;
  };

  var reduce = function (list, acc, fn) {
    each(list, function (item, index) {
      acc = fn(acc, item, index);
    });
    
    return acc;
  };

  var indexOfArray = function (list, item) {
    var index = [].indexOf.call(list, item);
    if (index === -1) { return; }
    return index;
  };
  
  var indexOfObject = function (list, item) {
    return each(list, function (currentItem, currentIndex) {
      if (currentItem === item) { return currentIndex; }
    });
  };
  
  var indexOf = function (list, item) {
    if (is.array(list)) { return indexOfArray(list, item); }
    return indexOfObject(list, item);
  };

  var contains = function (list, item) {
    return is.defined(indexOf(list, item));
  };

  var removeAt = function (list, index) {
    var removed;
    
    if (is.array(list)) {
      removed = ([].splice.call(list, index, 1))[0];
    } else {
      removed = list[index];
      delete list[index];
    }
    
    return removed;
  };

  var remove = function (list, item) {
    var index = indexOf(list, item);
    if (is.defined(index)) { removeAt(list, index); }
    return index;
  };

  return {
    each: each,
    map: map,
    filter: filter,
    reduce: reduce,
    indexOf: indexOf,
    contains: contains,
    removeAt: removeAt,
    remove: remove
  };
});
