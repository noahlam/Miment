import test from 'ava'

import miment from '../src/miment'

test('firstDayOfWeek api', t => {
  t.deepEqual(miment('2018-04-25 12:34:56').firstDayOfWeek().format(), '2018-04-22 12:34:56')
})