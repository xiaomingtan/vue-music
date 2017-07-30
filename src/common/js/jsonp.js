import originJsonp from 'jsonp';

export default function jsonp (url, data, option) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

    return new Promise((resolve, reject) => {
        originJsonp(url, option, (error, data) => {
            if (!error) {
                resolve(data)
            } else {
                reject(error)
            }
        });
    })

}

function param(data) {
    let param = '';
    for (var key in data) {
        let value = data[key] !== undefined ? data[key] : ''
        param += `&${key}=${value}`
    }

    return param ? param.substring(1) : param;

}
