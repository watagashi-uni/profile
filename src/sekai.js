import axios from 'axios';
import JSONbig from 'json-bigint';

export default function (url) {
  return axios.post('https://mo.zju.edu.cn/pyapi/apps/run/5fc78a949a6edafe98c1f3a7', {
    'app': {
      'input': {
        'url': {
          'val': url,
          'type': 'str'
        }
      },
      'output': {}
    },
    'version': 'dev'
  }, {
    transformResponse: data => JSONbig({ storeAsString: true }).parse(data),
  }).then(response => response.data.response);
}