import test from 'ava'

import miment from '../src/miment'

test('get api', t => {
  const m = miment('2018-05-05 05:05:05')
  t.deepEqual(m.get('YYYY'), '2018')
  t.deepEqual(m.get('MM'), '05')
  t.deepEqual(m.get('DD'), '05')
  t.deepEqual(m.get('hh'), '05')
  t.deepEqual(m.get('mm'), '05')
  t.deepEqual(m.get('ss'), '05')
})
