
// 获取min-max之间的随机数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) +　min)
}

// 洗牌 打乱数组
export function shuffle(arr) {
    let _arr = arr.slice()

    for (let i=0; i<_arr.length; i++) {
        let j = getRandomInt(0, i)
        let tmp = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = tmp
    }

    return _arr
}