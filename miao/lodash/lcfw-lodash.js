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
  drop: (array, n = 1) => {
    return array.filter(item => array.indexOf(item) >= n)
  },
  dropRight: (array, n = 1) => {
    return array.filter(item => array.indexOf(item) < (array.length - n))
  },
  fill: function(array, value, start = 0, end = array.length) {
    for (var i = start; i < end; i++) {
      array[i] = value
    }
    return array
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
    ary.forEach(function(item) {
      if (Array.isArray(item)) {
        var tmp = this.flattenDepth(ary, depth - 1)
        result = [...result, ...item]
      } else {
        result = [...result, item]
      }
    })
    return result
  },
}
