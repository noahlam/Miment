import test from 'ava'

import miment from '../src/miment'

test('distance api', t => {
  const m = miment('2008-02-21')
  const actual = m
    .distance('2008-02-09')
    .format('DD', true)
  t.deepEqual(actual, '12')
})
