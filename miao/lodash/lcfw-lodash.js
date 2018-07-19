var lcfw = {
  //创建元素的数组，将元素的长度分成组。如果数组不能均匀分割，则最终块将是剩余元素。
  chunk: function(array, size) {
    var result = []
    for (var start = 0, end = size; start < array.length; start += size, end += size) {
      result.push(array.slice(start, end))
    }
    return result
  }
  //创建一个移除所有FalSee值的数组。值Falk、NULL、0、“”、“未定义”和楠都是FalSee。
  compact: function(array) {
    var result = []
    for (var item of array) {
      if (item) {
        result.push(item)
      }
    }
    return item
  }
  difference: function(array, values) {
    var result = []
    for (var item of array) {
      if (!(item in values)) {
        result.push(item)
      }
    }
    return result
  }
}
