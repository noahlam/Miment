import test from 'ava'

import miment from '../src/miment'

test('lastDay api', t => {
  t.deepEqual(miment('2008-02-21 12:34:56').lastDay().format(), '2008-02-29 00:00:00')
  t.deepEqual(miment('2018-02-21 12:34:56').lastDay().format(), '2018-02-28 00:00:00')
  t.deepEqual(miment('2018-03-01 12:34:56').lastDay().format(), '2018-03-31 00:00:00')
  t.deepEqual(miment('2018-04-25 12:34:56').lastDay().format(), '2018-04-30 00:00:00')
})