/**
 * @author: Argus
 * @description TODO
 * @date 2020/2/22 19:19
 */
class Matrix {
  matrix

  constructor (matrix) {
    this.matrix = matrix
  }

  // 获取列的遍历数 [[]，[]，[]]=>3 纵坐标
  _getRowsNum () {
    return this.matrix.length
  }

  // 获取行号 [{} {} {} {}]  二维      横坐标
  _getColsNum () {
    return this.matrix[0].length
  }

  /**
   *  转置矩阵 二维数组
   *  期望:将这个[0,1] [1,0]
   */
  transpose () {
    // 构造二维数组 [[],[]] j为matrix_transposed第n行
    const matrix_transposed = []
    // const arr= []
    // 列不变
    for (let j = 0; j < this._getColsNum(); j++) {
      // 行改变
      matrix_transposed[j] = []
      for (let i = 0; i < this._getRowsNum(); i++) {
        //                    matrix[i][j] 第1行第一个 第二行第1个 ...
        matrix_transposed[j][i] = this.matrix[i][j]
      }
    }
    return matrix_transposed
  }

}

export { Matrix }