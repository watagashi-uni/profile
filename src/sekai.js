import axios from 'axios';
import JSONbig from 'json-bigint';

export default function (url) {
  return axios.get('https://api.pjsekai.moe' + url, {
    transformResponse: data => JSONbig({ storeAsString: true }).parse(data),
  }).then(response => response.data);
}

// const post = urls => axios.post('https://mo.zju.edu.cn/pyapi/apps/run/5fc78a949a6edafe98c1f3a7', {
//   'app': {
//     'input': {
//       'urls': {
//         'val': urls,
//         'type': '[str]'
//       }
//     },
//     'output': {}
//   },
//   'version': 'dev'
// }, {
//   transformResponse: data => JSONbig({ storeAsString: true }).parse(data),
// });

// export default function (url) {
//   if (url instanceof Array) {
//     return post(url).then(response => response.data.response.responses);
//   } else {
//     return post([url]).then(response => response.data.response.responses[0]);
//   }
// }
