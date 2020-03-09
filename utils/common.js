// 判断字符串是否为空串或 全部是空格 为空返回真
function isStrEqualsNullOrBlank(str) {
  if (str == ""||str == '""'||str == "''" || str.length===0) return true;
  var regu = "^[ ]+$";
  var re = new RegExp(regu);
  return re.test(str);
}
// 判断是否null 和 undefined 
function isDataEqualsNullAndUndefined(data) {
  // 为空返回 true
  if (!data) {
    return true
  }
  return false
}



const combination = function (arr, size) {
  var r = [];

  function _(t, a, n) {
    if (n === 0) {
      r[r.length] = t;
      return;
    }
    for (var i = 0, l = a.length - n; i <= l; i++) {
      var b = t.slice();
      b.push(a[i]);
      _(b, a.slice(i + 1), n - 1);
    }
  }
  _([], arr, size);
  return r;
}


class Joiner {
  _str = ''
  _symbol = '-'
  _cutCharNum = 1
  constructor(symbol, cutCharNum) {
    if (symbol) {
      this._symbol = symbol
    }
    if (cutCharNum){
      this._cutCharNum = cutCharNum
    }
  }
  join(part) {
    if (part) {
      this._str += `${part}${this._symbol}`;
    }
  }
  getStr() {
    return this._str.substring(0, this._str.length - this._cutCharNum)
  }
}

export {
  isStrEqualsNullOrBlank,
  isDataEqualsNullAndUndefined,
  combination,
  Joiner
}