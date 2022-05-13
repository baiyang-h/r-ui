import _ from 'lodash'

/**
 * 将下标数组转为数组
 * @param {String|Number} pathStr 字符串类型的树路径 例：2-3-4   [2, 3, 4]
 * return {Array}  数组类型
 */
export const indexToArray = pathStr => `${pathStr}`.split('-').map(n => +n);

export const isPath = pathIndex => {
  let result = true
  indexToArray(pathIndex).forEach(item => {
    if (isNaN(item)) {
      result = false
      return false
    }
  })

  return result
}

/**
 * 通过层级克隆一份当前的item
 * @param {Array}  list 数据
 * @param {String}  pathOrIndex  下标路径 1-1-1 或 1
 * @return {object}  返回详情对象
 */
export const getCloneItem = (list, pathOrIndex) => {
  const arr = indexToArray(pathOrIndex);
  let result = {};
  arr.forEach(n => {
    result = list[n];
    list = result.children;
  });
  return _.cloneDeep(result);
}

/**
 * 获取相应索引（层级）的父Item，如 1-1-1  就是获取1-1这个item, 他就是 1-1-1 的父级。  如果时根部则返回null
 * @param list
 * @param pathOrIndex    可能是1 直接索引（一般是根部的情况）， 也可能是 1-1-1（嵌套的情况）
 * @returns 返回一个相应层级的item信息，  即1-1  会返回索引 1-1  的这个item值，如果是根部则返回null
 */
const _getParent = (list, pathOrIndex) => {
  const arr = indexToArray(pathOrIndex)
  // 嵌套节点删除
  let parent;
  arr.pop()
  // 一般这种情况就是根
  if (arr.length === 0) {
    return null
  }
  arr.forEach((item, index) => {
    if (index === 0) {
      parent = list[item]
    } else {
      parent = parent.children[item]
    }
  })
  return parent
}

/**
 * 通过item的id字段名获取他的父级
 * @param list 所有控件list
 * @param id item的id （拖拽的控件id）
 * @returns {*}
 */
export const getParent = (list, id) => {
  // 返回null则表示为根
  let parentItem = null
  if(!list) return
  if(!list.length) return
  // 如果在根部的话就直接返回null
  for(let item of list) {
    if(item.id === id) return parentItem
  }
  const loop = (children, parent=null) => {
    for(let child of children) {
      if(child.id === id) {
        parentItem = parent
        return true
      }
      if(child.children && child.children.length) {
        const f = loop(child.children, child)
        if(f) return true
      }
    }
  }
  loop(list)
  return parentItem
}

/**
 * 根据路径删除数据
 * @param {*} list
 * @param {*} pathOrIndex
 * @return {*}
 */
export const itemRemove = (list, pathOrIndex) => {
  let parent = _getParent(list, pathOrIndex);
  let arr = indexToArray(pathOrIndex)
  let getIndex = arr.pop()
  if(parent) {
    parent.children.splice(getIndex, 1)
    return list
  }
  list.splice(getIndex, 1)
  return list
}

/**
 * 向list的index索引位置添加item
 * @param list
 * @param pathOrIndex
 * @param item
 * @returns {*}
 */
export const itemAdd = (list, pathOrIndex, item) => {
  // 获取pathOrIndex相应的父级，如果是根则返回null
  let parent = _getParent(list, pathOrIndex);
  let arr = indexToArray(pathOrIndex)
  let getIndex = arr.pop()
  if (parent) {
    parent.children.splice(getIndex, 0, item)
    return list
  }
  list.splice(getIndex, 0, item)
  return list
}

