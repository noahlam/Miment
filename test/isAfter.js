import test from 'ava'

import miment from '../src/miment'

test('isAfter api', t => {
  t.deepEqual(miment().isAfter('2000-01-01'), true)
  t.deepEqual(miment().isAfter('3000-01-01'), false)
  t.deepEqual(miment('2018-04-25 00:00:01').isAfter('2018-04-25 00:00:00'), true)
})
