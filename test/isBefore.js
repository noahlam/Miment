import test from 'ava'

import miment from '../src/miment'

test('isBefore api', t => {
  t.deepEqual(miment().isBefore('2000-01-01'), false)
  t.deepEqual(miment().isBefore('3000-01-01'), true)
  t.deepEqual(miment('2018-04-25 00:00:00').isBefore('2018-04-25 00:00:01'), true)
})
