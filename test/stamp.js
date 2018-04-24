import test from 'ava'

import miment from '../src/miment'

test('stamp api', t => {
  const m = miment('2008-02-21 12:34:56')
  t.deepEqual(m.stamp(), 1203568496000)
})
