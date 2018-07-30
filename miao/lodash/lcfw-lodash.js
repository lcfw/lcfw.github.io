var lcfw = {
  chunk: function(array, size) {
    var result = []
    for (var start = 0, end = size; start < array.length; start += size, end += size) {
      result.push(array.slice(start, end))
    }
    return result
  },
  compact: function(array) {
    var result = []
    for (var item of array) {
      if (item) {
        result.push(item)
      }
    }
    return result
  },
  difference: function(array, ...args) {
    args = [].concat(...args)
    return array.reduce((result, item) => {
      if (!args.includes(item)) {
        result.push(item)
      }
      return result
    }, [])
  },
  differenceBy: function(array, ...args) {
    args = [].concat(...args)
    if ((typeof args[args.length - 1]) === 'string') {
      iteratee = this.property(args.pop())
    } else if (typeof args[args.length - 1] === 'function') {
      iteratee = args.pop()
    } else {
      iteratee = this.identity
    }
    args = args.map(iteratee)
    return array.filter(item => !args.includes(iteratee(item)))
  },
  differenceWith: function(array, values, comparator) {
    return array.filter(item => !values.every(it => comparator(it, item)))
  },
  drop: (array, n = 1) => {
    return array.filter(item => array.indexOf(item) >= n)
  },
  dropRight: (array, n = 1) => {
    return array.filter(item => array.indexOf(item) < (array.length - n))
  },
  dropRightWhile: function(array, predicate = identity) {
    predicate = this.iteratee(predicate)

    for (var i = array.length - 1; i >= 0; i--) {
      if (predicate(array[i])) {
        array.pop()
      } else {
        return array
      }
    }
  },
  dropWhile: function(arr, predicate = identity) {
    predicate = this.iteratee(predicate)
    for (var i in arr) {
      if (!predicate(arr[i])) {
        return arr.slice(i)
      }
    }
  },
  fill: function(array, value, start = 0, end = array.length) {
    for (var i = start; i < end; i++) {
      array[i] = value
    }
    return array
  },
  findIndex: function(arr, predicate = identity, fromIndex = 0) {
    predicate = this.iteratee(predicate)
    for (var i = fromIndex; i < arr.length; i++) {
      if (predicate(arr[i])) {
        return i
      }
    }
    return -1
  },
  findLastIndex: function(arr, predicate = identity, fromIndex = arr.length - 1) {
    predicate = this.iteratee(predicate)
    for (var i = fromIndex; i >= 0; i--) {
      if (predicate(arr[i])) {
        return i
      }
    }
    return -1
  },
  flatten: function(array) {
    return array.reduce(function(result, item) {
      if (Array.isArray(item)) {
        result = [...result, ...item]
      } else {
        result = [...result, item]
      }
      return result
    }, [])
  },
  flattenDeep: function(ary) {
    var result = []
    for (var i = 0; i < ary.length; i++) {
      if (Array.isArray(ary[i])) {
        var tmp = this.flattenDeep(ary[i])
        result = [...result, ...tmp]
      } else {
        result.push(ary[i])
      }
    }
    return result
  },
  flattenDepth: function(ary, depth = 1) {
    if (depth == 0) {
      return ary.slice()
    }
    var result = []
    for (var i = 0; i < ary.length; i++) {
      if (Array.isArray(ary[i])) {
        var tmp = this.flattenDepth(ary[i], (depth - 1))
        result = [...result, ...tmp]
      } else {
        result = [...result, ary[i]]
      }
    }
    return result
  },
  fromPairs: pairs => {
    return pairs.reduce((result, item) => {
      result[item[0]] = item[1]
      return result
    }, {})
  },
  head: function(array) {
    return array[0]
  },
  indexOf: function(array, value, fromIndex = 0) {
    for (var i = fromIndex; i < array.length; i++) {
      if (array[i] == value) {
        return i
      }
    }
    return -1
  },
  initial: function(array) {
    return array.slice(0, array.length - 1)
  },
  intersection: function(array, ...arys) {
    var arys = [].concat(...arys)
    return result = array.filter(item => arys.includes(item))
  },
  intersectionBy: function(ary, ...arrs) {
    arrs = [].concat(...arrs)
    if ((typeof arrs[arrs.length - 1]) === 'string') {
      iteratee = this.property(arrs.pop())
    } else if (typeof arrs[arrs.length - 1] === 'function') {
      iteratee = arrs.pop()
    } else {
      iteratee = this.identity
    }
    return ary.filter(item => arrs.map(x => iteratee(x)).includes(iteratee(item)))
  },
  intersectionWith: function(ary, ...arrs) {
    arrs = [].concat(...arrs)
    if ((typeof arrs[arrs.length - 1]) === 'string') {
      comp = this.property(arrs.pop())
    } else if (typeof arrs[arrs.length - 1] === 'function') {
      comp = arrs.pop()
    } else {
      comp = this.identity
    }
    return ary.filter(item1 => {
      return arrs.filter(item2 => {
        return comp(item1, item2)
      }).length != 0
    })
  },
  join: function(array, seperator = ',') {
    var array = array.map(item => item + seperator.toString())
    var str = array.reduce((a, b) => a + b)
    return str.slice(0, str.length - 1)
  },
  last: function(array) {
    return array[array.length - 1]
  },
  lastIndexOf: function(array, value, fromIndex = array.length - 1) {
    for (var i = fromIndex; i >= 0; i--) {
      if (array[i] == value) {
        return i
      }
    }
    return -1
  },
  nth: function(array, n = 0) {
    return n >= 0 ? array[n] : array[n + array.length]
  },
  pull: function(array, ...args) {
    var args = [].concat(...args)
    for (var i = 0; i < array.length; i++) {
      if (args.includes(array[i])) {
        array.splice(i, 1)
        i--
      }
    }
    return array
  },
  pullAll: function(array, values) {
    for (var i = 0; i < array.length; i++) {
      if (values.includes(array[i])) {
        array.splice(i, 1)
        i--
      }
    }
    return array
  },
  pullAllBy: function(array, values, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    var values = values.map(val => iteratee(val))
    for (var i = 0; i < array.length; i++) {
      if (values.includes(iteratee(array[i]))) {
        array.splice(i, 1)
        i--
      }
    }
    return array
  },
  pullAllWith: function(array, values, comp) {
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < values.length; j++) {
        if (comp(array[i], values[j])) {
          array.splice(i, 1)
          i--
          break
        }
      }
    }
    return array
  },
  reverse: function(array) {
    for (var i = 0; i < array.length; i++) {
      var item = array.pop()
      array.splice(i, 0, item)
    }
    return array
  },
  sortedIndex: function(array, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] >= value) {
        return i
      }
    }
    return array.length - 1
  },
  sortedIndexBy: function(array, value, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    for (var i in array) {
      if (iteratee(value) >= iteratee(array[i]))
        return Number(i)
    }
    return array.length - 1
  },
  sortedIndexOf: function(array, value) {
    var sma = 0
    var big = array.length - 1

    function bin(sma, big) {
      var cha = Math.floor((sma + big) / 2)
      array[cha] >= value ? big = cha : sma = cha
      if (array[cha - 1] < value) {
        return cha
      } else {
        return bin(sma, big)
      }
    }
    return bin(sma, big)
  },
  sortedLastIndex: function(array, value) {
    for (var i = array.length - 1; i >= 0; i--) {
      if (array[i] <= value) {
        return i + 1
      }
    }
    return 0
  },
  sortedLastIndexBy: function(array, value, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    for (var i = array.length - 1; i >= 0; i--) {
      if (iteratee(array[i]) <= iteratee(value)) {
        return i + 1
      }
    }
    return 0
  },
  sortedLastIndexOf: function(array, value) {
    var sma = 0
    var big = array.length - 1

    function bin(sma, big) {
      var cha = Math.floor((sma + big) / 2)
      array[cha] <= value ? sma = cha : big = cha
      if (array[cha + 1] > value) {
        return cha
      } else {
        return bin(sma, big)
      }
    }
    return bin(sma, big)
  },
  sortedUniq: array => {
    return array.filter((item, index) => item != array[index - 1])
  },
  sortedUniqBy: function(array, iteratee) {
    iteratee = this.iteratee(iteratee)
    return array.filter((item, index) => iteratee(item) != iteratee(array[index - 1]))
  },
  tail: array => array.slice(1),
  take: (array, n = 1) => array.slice(0, n),
  takeRight: (array, n = 1) => {
    if (n > array.length) {
      n = array.length
    }
    return array.slice(array.length - n, array.length)
  },
  takeRightWhile: function(array, predicate = identity) {
    predicate = this.iteratee(predicate)
    for (var i = array.length - 1; i >= 0; i--) {
      if (!predicate(array[i])) {
        return array.slice(i + 1)
      }
    }
  },
  takeWhile: function(array, predicate = identity) {
    predicate = this.iteratee(predicate)
    for (var i in array) {
      if (!predicate(array[i])) {
        return array.slice(0, i)
      }
    }
  },
  union: function(...arrs) {
    arrs = [].concat(...arrs)
    return arrs.reduce((result, item) => {
      if (!result.includes(item)) {
        result = [...result, item]
      }
      return result
    }, [])
  },
  unionBy: function(arr, ...arrs) {
    arrs = [].concat(...arrs)
    if ((typeof arrs[arrs.length - 1]) === 'string') {
      iteratee = this.property(arrs.pop())
    } else if (typeof arrs[arrs.length - 1] === 'function') {
      iteratee = arrs.pop()
    } else {
      iteratee = this.identity
    }
    var ary = arr.map(item => iteratee(item))
    var arr = arr.slice()
    arrs.reduce((result, item) => {
      if (!result.includes(iteratee(item))) {
        result = [...result, item]
        arr.push(item)
      }
      return result
    }, ary)
    return arr
  },
  unionWith: function(arr, ...arrs) {
    arrs = [].concat(...arrs)
    if ((typeof arrs[arrs.length - 1]) === 'string') {
      comp = this.property(arrs.pop())
    } else if (typeof arrs[arrs.length - 1] === 'function') {
      comp = arrs.pop()
    } else {
      comp = this.identity
    }
    return arrs.reduce((result, item1) => {
      if (arr.every(item2 => !comp(item1, item2))) {
        result = [...result, item1]
      }
      return result
    }, arr)
  },
  uniq: function(array) {
    return array.reduce((result, item) => {
      if (!result.includes(item)) {
        result = [...result, item]
      }
      return result
    }, [])
  },
  uniqBy: function(array, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    var arr = []
    return array.reduce((result, item) => {
      if (!arr.includes(iteratee(item))) {
        arr.push(iteratee(item))
        result = [...result, item]
      }
      return result
    }, [])
  },
  uniqWith: function(array, comp) {
    var ary = [].concat(array.shift())
    return array.reduce((result, item1) => {
      if (!result.some(item2 => comp(item1, item2))) {
        result = [...result, item1]
      }
      return result
    }, ary)
  },
  // unzip: function() {

  // },
  // unzipWith: function() {

  // },
  without: function(array, ...values) {
    values = [...values]
    return array.filter(item => !values.includes(item))
  },
  xor: function(...arys) {
    arys = [].concat(...arys)
    return arys.filter(item => arys.lastIndexOf(item) == arys.indexOf(item))
  },
  xorBy: function(...arrs) {
    arrs = [].concat(...arrs)
    if ((typeof arrs[arrs.length - 1]) === 'string') {
      var iteratee = this.property(arrs.pop())
    } else if (typeof arrs[arrs.length - 1] === 'function') {
      var iteratee = arrs.pop()
    } else {
      var iteratee = this.identity
    }

    var arys = arrs.map(item => iteratee(item))
    return arrs.filter(item => arys.lastIndexOf(iteratee(item)) == arys.indexOf(iteratee(item)))
  },
  xorWith: function(array, other, comp) {
    array = [...array, ...other]
    var arr
    var result = []
    for (var i in array) {
      arr = array.slice()
      arr.splice(i, 1)
      if (arr.every(item => !comp(item, array[i]))) {
        result = [...result, array[i]]
      }
    }
    return result
  },
  // zip: function() {

  // },
  // zipobject: function() {

  // },
  // zipobjectdeep: function() {

  // },
  // zipwith: function() {

  // },
  countBy: function(collection, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    return collection.reduce((result, item) => {
      result[iteratee(item)] = (result[iteratee(item)] || 0) + 1
      return result
    }, {})
  },
  every: function(collection, predicate = identity) {
    predicate = this.iteratee(predicate)
    for (item of collection) {
      if (!predicate(item)) {
        return false
      }
    }
    return true
  },
  filter: function(collection, predicate = identity) {
    predicate = this.iteratee(predicate)
    var result = []
    for (i in collection) {
      if (predicate(collection[i], i, collection)) {
        result.push(collection[i])
      }
    }
    return result
  },
  find: function(collection, predicate = identity, fromIndex = 0) {
    predicate = this.iteratee(predicate)
    for (var i = fromIndex; i < collection.length; i++) {
      if (predicate(collection[i])) {
        return collection[i]
      }
    }
  },
  findLast: function(collection, predicate = identity, fromIndex = collection.length - 1) {
    predicate = this.iteratee(predicate)
    for (var i = fromIndex; i >= 0; i--) {
      if (predicate(collection[i])) {
        return collection[i]
      }
    }
  },
  flatMap: function(collection, iteratee = identity) {
    return lcfw.flatten(collection.map(item => iteratee(item)))
  },
  flatMapDeep: function(collection, iteratee = identity) {
    return lcfw.flattenDeep(collection.map(item => iteratee(item)))
  },
  flatMapDepth: function(collection, iteratee = identity, depth = 1) {
    return lcfw.flattenDepth(collection.map(item => iteratee(item)), depth)
  },
  forEach: function(collection, iteratee = identity) {
    for (var i in collection) {
      iteratee(collection[i], i, collection)
    }
    return collection
  },
  forEachRight: function(collection, iteratee = identity) {
    for (var i = collection.length; i >= 0; i--) {
      iteratee(collection[i], i, collection)
    }
    return collection
  },
  groupBy: function(collection, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    var result = {}
    collection.forEach(item => {
      result[iteratee(item)] = result[iteratee(item)] || []
      result[iteratee(item)].push(item)
    })
    return result
  },
  includes: function(collection, value, fromIndex = 0) {
    for (var i = fromIndex;; i++) {
      if (Array.isArray(collection)) {
        return collection.slice(i).includes(value)
      } else if (typeof collection == 'object') {
        return Object.values(collection).includes(value)

      } else if (typeof collection == 'string') {
        return collection.includes(value)
      }
    }
  },
  // invokeMap: function() {

  // },
  keyBy: function(collection, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    return collection.reduce((result, item) => {
      result[iteratee(item)] = result[iteratee(item)] || {}
      Object.assign(result[iteratee(item)], item)
      return result
    }, {})
  },
  map: function(collection, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    var result = []
    for (var i in collection) {
      result = [...result, iteratee(collection[i], i, collection)]
    }
    return result
  },
  // orderBy: function() {

  // },
  partition: function(collection, predicate = identity) {
    predicate = this.iteratee(predicate)
    return collection.reduce((result, item) => {
      if (predicate(item)) {
        result[0] = result[0] || []
        result[0].push(item)
      } else {
        result[1] = result[1] || []
        result[1].push(item)
      }
      return result
    }, [])
  },
  // reduce: function() {

  // },
  // reduceRight: function() {

  // },
  // reject: function() {

  // },
  // sample: function() {

  // },
  // sampleSize: function() {

  // },
  // shuffle: function() {

  // },
  // size: function() {

  // },
  // some: function() {

  // },
  // sortBy: function() {

  // },
  // defer: function() {

  // },
  // delay: function() {

  // },
  // castArray: function() {

  // },
  // conformsTo: function() {

  // },
  // eq: function() {

  // },
  // gt: function() {

  // },
  // gte: function() {

  // },
  isArguments: value => Object.prototype.toString.call(value) === '[object Arguments]',
  isArray: value => Array.isArray(value),
  //isArrayBuffer: function() {

  // },
  // isArrayLike: function() {

  // },
  // isArrayLikeObject: function() {

  // },
  isBoolean: value => Object.prototype.toString.call(value) === '[object Boolean]',
  isDate: value => Object.prototype.toString.call(value) === '[object Date]',
  // isElement: function() {

  // },
  // isEmpty: function() {

  // },
  isEqual: function(value, other) {
    if (value === other) {
      return true
    } else if ((value !== value) && (other !== other)) {
      return true
    } else if (Array.isArray(value) && Array.isArray(other)) {
      if (value.toString() === other.toString()) {
        return true
      }
    } else if ((typeof value === 'object') && (typeof other === 'object')) {
      if (Object.keys(value).length === Object.keys(other).length) {
        for (item in value) {
          if (!lcfw.isEqual(value[item], other[item])) {
            return false
          }
        }
        return true
      }
    }
    return false
  },
  //isEqualWith: function() {

  // },
  isError: value => Object.prototype.toString.call(value) === "[object Error]",
  //isFinite: function() {

  // },
  isFunction: value => Object.prototype.toString.call(value) === "[object Function]",
  // isInteger: function() {

  // },
  // isLength: function() {

  // },
  // isMap: function() {

  // },
  // isMatch: function() {

  // },
  // isMatchWith: function() {

  // },
  // isNaN: function() {

  // },
  // isNative: function() {

  // },
  // isNil: function() {

  // },
  // isNull: function() {

  // },
  // isNumber: function() {

  // },
  // isObject: function() {

  // },
  // isObjectLike: function() {

  // },
  // isPlainObject: function() {

  // },
  // isRegExp: function() {

  // },
  // isSafeInteger: function() {

  // },
  // isSet: function() {

  // },
  isString: value => typeof value === 'string',
  //isSymbol: function() {

  // },
  // isTypedArray: function() {

  // },
  isUndefined: value => Object.prototype.toString.call(value) === "[object Undefined]",
  //isWeakMap: function() {

  // },
  //isWeakSet: function() {

  //},
  //
  //
  //
  //
  //
  //
  //
  //
  //
  assign: function(object, ...obj) {
    obj = Object.assign({}, ...obj)
    for (var name in obj) {
      if (obj.hasOwnProperty(name)) {
        object[name] = typeof obj[name] === 'object' ? this.assign(object[name], obj[name]) : obj[name]
      }
    }
    return object
  },



  add: (augend, addend) => augend + addend,
  ceil: (number, precision = 0) => Math.ceil(number * (10 ** precision)) / (10 ** precision),
  divide: (dividend, divisor) => dividend / divisor,
  floor: (number, precision = 0) => Math.floor(number * (10 ** precision)) / (10 ** precision),
  max: function(array) {
    if (array.length != 0) {
      return array.reduce((result, item) => {
        result = (item > result) ? item : result
        return result
      }, -Infinity)
    }
    return undefined
  },
  maxBy: function(array, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    if (array.length != 0) {
      return array.reduce((result, item) => {
        result = (iteratee(item) > iteratee(result)) ? item : result
        return result
      })
    }
    return undefined
  },



  sum: function(array) {
    return array.reduce((result, item) => {
      result += item
      return result
    }, 0)
  },
  sumBy: function(array, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    return array.reduce((result, item) => {
      result += iteratee(item)
      return result
    }, 0)
  },


  identity: function(v) {
    return v
  },
  //concat: function() {

  //},
  //pullAt: function() {

  //},
  matches: function(shorthand) {
    return function(value) {
      for (var item in shorthand) {
        if (shorthand[item] !== value[item]) {
          return false
        }
      }
      return true
    }
  },
  property: function(propName) {
    return function(obj) {
      return obj[propName]
    }
  },
  //ary: function() {

  //},
  //unary: function() {

  //},
  //negate: function() {

  //},
  //once: function() {

  //},
  //spread: function() {

  //},
  //curry: function() {

  //},
  //memoize: function() {

  //},
  //flip: function() {

  //},
  //conforms: function() {

  //},
  //constant: function() {

  //},
  //flow: function() {

  //},
  //method: function() {

  //},
  //methodOf: function() {

  //},
  //nthArg: function() {

  //},
  //propertyOf: function() {

  //},
  //parseJson: function() {

  //},



  iteratee: function(shorthand) {
    if (typeof shorthand === 'function') {
      return shorthand
    } else if (typeof shorthand === 'string') {
      return this.property(shorthand)
    } else if (Array.isArray(shorthand)) {
      return this.matchesProperty(shorthand)
    } else if (typeof shorthand === 'object') {
      return this.matches(shorthand)
    }
  },
  matchesProperty: function(shorthand) {
    return function(value) {
      return value[shorthand[0]] == shorthand[1]
    }
  },
}
