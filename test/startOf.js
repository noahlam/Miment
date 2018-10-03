import test from 'ava'

import miment from '../src/miment'

test('startOf api', t => {
  t.deepEqual(miment('2018-05-05 05:05:05').startOf('YYYY').format(), '2018-01-01 00:00:00')
  t.deepEqual(miment('2018-05-05 05:05:05').startOf('MM').format(), '2018-05-01 00:00:00')
  t.deepEqual(miment('2018-05-05 05:05:05').startOf('DD').format(), '2018-05-05 00:00:00')
  t.deepEqual(miment('2018-05-05 05:05:05').startOf('hh').format(), '2018-05-05 05:00:00')
  t.deepEqual(miment('2018-05-05 05:05:05').startOf('mm').format(), '2018-05-05 05:05:00')
  t.deepEqual(miment('2018-05-05 05:05:05').startOf('ww').format(), '2018-04-29 00:00:00')
})
