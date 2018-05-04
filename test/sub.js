import test from 'ava'

import miment from '../src/miment'

test('sub api', t => {
  const m = miment('2008-02-21 12:34:56')
  t.deepEqual(m.sub(1, 'DD').format(), '2008-02-20 12:34:56')
})

test('sub with args', t => {
  const m = miment('2008-02-21')
  const actual = m
    .sub(1, 'YYYY')
    .sub(1, 'MM')
    .sub(3, 'DD')
    .format()

  t.deepEqual(actual, '2007-01-18 00:00:00')
})
