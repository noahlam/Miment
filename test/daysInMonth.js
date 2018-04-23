import test from 'ava'

import miment from '../src/miment'

test('daysInMonth api', t => {
  t.deepEqual(miment('2018-02-21 12:34:56').daysInMonth(), 28)
  t.deepEqual(miment('2018-03-21 12:34:56').daysInMonth(), 31)
  t.deepEqual(miment('2018-04-21 12:34:56').daysInMonth(), 30)
})
