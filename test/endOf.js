import test from 'ava'

import miment from '../src/miment'

test('startOf api', t => {
  t.deepEqual(miment('2018-05-05 05:05:05').endOf('YYYY').format(), '2018-12-31 23:59:59')
  t.deepEqual(miment('2018-05-05 05:05:05').endOf('MM').format(), '2018-05-31 23:59:59')
  t.deepEqual(miment('2018-05-05 05:05:05').endOf('DD').format(), '2018-05-05 23:59:59')
  t.deepEqual(miment('2018-05-05 05:05:05').endOf('hh').format(), '2018-05-05 05:59:59')
  t.deepEqual(miment('2018-05-05 05:05:05').endOf('mm').format(), '2018-05-05 05:05:59')
  t.deepEqual(miment('2018-05-05 05:05:05').endOf('ww').format(), '2018-05-05 23:59:59')
})
