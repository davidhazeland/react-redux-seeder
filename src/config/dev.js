'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',
  apiPath: 'http://localhost:3000/',
  filePath: 'http://localhost:3400/'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
