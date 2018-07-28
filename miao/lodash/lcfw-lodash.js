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
    return arrs.filter(item => {
      return this.intersection(ary.map(x => iteratee(x)), iteratee(item)).length != 0
    })
  },
  intersectionWith: function(ary, arrs) {
    arrs = [].concat(...arrs)
    if ((typeof arrs[arrs.length - 1]) === 'string') {
      comp = this.property(arrs.pop())
    } else if (typeof arrs[arrs.length - 1] === 'function') {
      comp = arrs.pop()
    } else {
      comp = this.identity
    }
    return ary.filter(item1 => {
      return arrs.filter(item2 => comp(item1, item2))
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
  nth: function() {

  },
  pull: function(array, ...args) {
    var args = [].concat(...args)
    return array.filter(item => args.indexOf(item) == -1)
  },
  pullAll: function() {

  },
  pullAllBy: function() {

  },
  pullAllWith: function() {

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
  sortedIndexBy: function() {

  },



  property: function(propName) {
    return function(obj) {
      return obj[propName]
    }
  },
  identity: function(v) {
    return v
  },

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
  matchesProperty: function(shorthand) {
    return function(value) {
      return value[shorthand[0]] == shorthand[1]
    }
  },



  assign: function(object, ...obj) {
    obj = Object.assign({}, ...obj)
    for (var name in obj) {
      if (obj.hasOwnProperty(name)) {
        object[name] = typeof obj[name] === 'object' ? this.assign(object[name], obj[name]) : obj[name]
      }
    }
    return object
  },
}
