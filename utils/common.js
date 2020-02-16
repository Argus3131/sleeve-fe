// 判断字符串是否为空串或 全部是空格 为空返回真
function isStrEqualsNullOrBlank(str) {
  if (str == "") return true;
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


export {
  isStrEqualsNullOrBlank,
  isDataEqualsNullAndUndefined
}