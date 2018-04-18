import test from 'ava'

import miment from '../src/miment'

test('add api', t => {
  const m = miment('2008-02-21 12:34:56')
  t.deepEqual(m.add(1, 'DD').format(), '2008-02-22 12:34:56')
})

test('add with args', t => {
  const m = miment('2008-02-21')
  const actual = m
    .add(-1, 'YYYY')
    .add(10, 'MM')
    .add(3, 'DD')
    .format()

  t.deepEqual(actual, '2007-12-24 00:00:00')
})
