import { file_download } from '../../common/js/config'
export default {
   methods: {
    processServerUrl(url) {
        // let mid = '/download/file/'
        // if (type === 'video') {
        //   mid = '/download/media/'
        // }
        if (!url) {
          return url
        }
        if (url.indexOf('http') == 0 || url.indexOf('https') == 0) {
          return url
        }
        if (url.indexOf('data:') === 0) {
          return url
        }
        return file_download + url
      },
   }
}