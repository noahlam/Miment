import test from 'ava'

import miment from '../src/miment'

test('isBetween api', t => {
  t.deepEqual(miment('2018-04-25').isBetween('2018-04-24', '2018-04-26'), true)
  t.deepEqual(miment('2018-04-25').isBetween('2018-04-26', '2018-04-24'), true)
})
