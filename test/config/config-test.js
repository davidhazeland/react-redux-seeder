'use strict';

import test from 'tape';
import config from 'config';


test('appEnvConfigTests', assert => {
  const actual = config.appEnv;
  const expected = 'test';

  assert.deepEqual(actual, expected);

  assert.end();
});
