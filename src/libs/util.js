
/*************************************** props中  width 和 height 处理 *******************************************/

// 属性是否是 width、height、maxWidth、maxHeight、minWidth、minHeight
export function isWH(key) {
    switch(key) {
        case 'width':
        case 'height':
        case 'maxWidth':
        case 'maxHeight':
        case 'minWidth':
        case 'minHeight':
            return true;
        default:
            return false;
    }
}

// 属性的props属性中是否存在 width、height、maxWidth、maxHeight、minWidth、minHeight 这些属性, 如果存在则返回 true
export function isPropsHasWOrH(props) {
    for(let key of Object.keys(props)) {
        if(isWH(key)) return true
    }
    return false
}

/**
 * @description 一个处理 width、height、maxWidth、maxHeight、minWidth、minHeight 这些属性的方法，对于这些方法如果传入的是 100 -转为> '100px'， 不是 string和number 则去掉该属性
 * @param {string|number} v 100 | '100px'
 * @return {object} key为上面属性， 值为如 '100px'
 */
export function processWidthAndHeightProps(props) {
    let styles = {}
    Object.keys(props).forEach(key => {
        if(isWH(key)) {
            if(typeof props[key] === 'number') {
                styles[key] = `${props[key]}px`
            } else {
                if(typeof props[key] === 'string' && props[key] !== '') {
                    styles[key] = props[key]
                }
            }
        }
    });
    return styles;
}

/**********************************************************************************/