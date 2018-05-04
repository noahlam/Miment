import test from 'ava'

import miment from '../src/miment'

test('set api', t => {
  t.deepEqual(miment('2018-05-05 05:05:05').set(2019,'YYYY').format(), '2019-05-05 05:05:05')
  t.deepEqual(miment('2018-05-05 05:05:05').set(1,'MM').format(), '2018-01-05 05:05:05')
  t.deepEqual(miment('2018-05-05 05:05:05').set(1,'DD').format(), '2018-05-01 05:05:05')
  t.deepEqual(miment('2018-05-05 05:05:05').set(1,'hh').format(), '2018-05-05 01:05:05')
  t.deepEqual(miment('2018-05-05 05:05:05').set(1,'mm').format(), '2018-05-05 05:01:05')
  t.deepEqual(miment('2018-05-05 05:05:05').set(1,'ss').format(), '2018-05-05 05:05:01')
  t.deepEqual(miment('2018-05-05 05:05:05').set(1,'ww').format(), '2018-01-07 05:05:05')
})