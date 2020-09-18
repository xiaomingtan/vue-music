import jsonp from '@/common/js/jsonp'
import {commonParams, options, server_url} from './config'
import axios from 'axios'

export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })

    return jsonp(url, data, options);
}

export function getDiscList(params) {
    const url = server_url + '/api/music2/find'

    const data = Object.assign({}, commonParams, params)

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })

}

export function getSongList(disstid) {
    //const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    const url = '/api/getSongList'
    const data = Object.assign({}, commonParams, {
        disstid,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0
    })

    //return jsonp(url, data, options)
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}