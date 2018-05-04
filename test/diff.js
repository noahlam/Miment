import test from 'ava'

import miment from '../src/miment'

test('diff api', t => {
  const m = miment('2018-05-05 05:05:05')
  t.deepEqual(m.diff('2018-05-05 05:05:04'), 1000)
})
