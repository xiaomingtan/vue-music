/**
 * Created by Administrator on 2017/7/17.
 */


export function hasClass(dom, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');

    return reg.test(dom.className)
}

export function addClass(dom, className) {
    if (hasClass(dom, className)) {
        return
    }
    let classNameArr = dom.className.split(' ')
    classNameArr.push(className)
    dom.className = classNameArr.join(' ')
}

export function getData(el, name, val) {
    const prefix = 'data-'
    let realname = prefix + name
    if (val) {
        return el.setAttribute(realname, val)
    }

    return el.getAttribute(realname)
}