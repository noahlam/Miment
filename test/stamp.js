import test from 'ava'

import miment from '../src/miment'

// it's not exact before support time zone
test('stamp api', t => {
  const m = miment('2008-02-21 12:34:56')
  t.deepEqual(typeof m.stamp(), 'number')
})
