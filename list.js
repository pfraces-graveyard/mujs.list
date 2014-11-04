define('mu.list.each', function (require) {
  'use strict';

  var isDefined = require('mu.is.defined'),
      isArray   = require('mu.is.array'),
      isScalar  = require('mu.is.scalar');

  var iterateArray = function (list, func) {
    for (var index = 0, len = list.length; index < len; index++) {
      var exit = func(list[index], index);
      if (isDefined(exit)) { return exit; }
    }
  };
  
  var iterateObject = function (list, func) {
    for (var prop in list) {
      var exit = func(list[prop], prop);
      if (isDefined(exit)) { return exit; }
    }
  };
  
  var each = function (list, func) {
    if (isScalar(list)) { return; }
    if (isArray(list)) { return iterateArray(list, func); }
    return iterateObject(list, func);
  };
  
  return each;
});

define('mu.list.map', function (require) {
  'use strict';

  var isArray = require('mu.is.array'),
      each    = require('mu.list.each');

  var map = function (list, func) {
    var mapped = isArray(list) ? [] : {};
    
    each(list, function (item, index) {
      mapped[index] = func(item, index);
    });

    return mapped;
  };
  
  return map;
});

define('mu.list.filter', function (require) {
  'use strict';

  var isArray = require('mu.is.array'),
      each    = require('mu.list.each');

  var filter = function (list, func) {
    var isArr = isArray(list),
        filtered = isArr ? [] : {};
    
    each(list, function (item, index) {
      if (!func(item, index)) { return; }
      index = isArr ? filtered.length : index;
      filtered[index] = item;
    });
    
    return filtered;
  };
  
  return filter;
});

define('mu.list.reduce', function (require) {
  'use strict';
  
  var each = require('mu.list.each');
  
  var reduce = function (list, acc, func) {
    each(list, function (item, index) {
      acc = func(acc, item, index);
    });
    
    return acc;
  };
  
  return reduce;
});

define('mu.list.indexOf', function (require) {
  'use strict';

  var isArray = require('mu.is.array'),
      each    = require('mu.list.each');

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
    if (isArray(list)) { return indexOfArray(list, item); }
    return indexOfObject(list, item);
  };
  
  return indexOf;
});

define('mu.list.contains', function (require) {
  'use strict';

  var isDefined = require('mu.is.defined'),
      indexOf   = require('mu.list.indexOf');

  var contains = function (list, item) {
    return isDefined(indexOf(list, item));
  };
  
  return contains;
});

define('mu.list.removeAt', function (require) {
  'use strict';

  var isArray = require('mu.is.array');

  var removeAt = function (list, index) {
    var removed;
    
    if (isArray(list)) {
      removed = ([].splice.call(list, index, 1))[0];
    } else {
      removed = list[index];
      delete list[index];
    }
    
    return removed;
  };
  
  return removeAt;
});

define('mu.list.remove', function (require) {
  'use strict';

  var isDefined = require('mu.is.defined'),
      indexOf   = require('mu.list.indexOf'),
      removeAt  = require('mu.list.removeAt');

  var remove = function (list, item) {
    var index = indexOf(list, item);
    if (isDefined(index)) { removeAt(list, index); }
    return index;
  };
  
  return remove;
});
  
define('mu.list', function (require) {
  'use strict';

  return {
    each:     require('mu.list.each'),
    map:      require('mu.list.map'),
    filter:   require('mu.list.filter'),
    reduce:   require('mu.list.reduce'),
    indexOf:  require('mu.list.indexOf'),
    contains: require('mu.list.contains'),
    removeAt: require('mu.list.removeAt'),
    remove:   require('mu.list.remove')
  };
});
