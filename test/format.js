import test from 'ava'

import miment from '../src/miment'

test('format api', t => {
  const m = miment('2008-02-21')
  t.deepEqual(m.format(), '2008-02-21 00:00:00')
})

test('format with formatters', t => {
  const m = miment('2008-02-21')
  t.deepEqual(m.format('YYYY/MM/DD hh:mm:ss'), '2008/02/21 00:00:00')
  t.deepEqual(m.format('YYYY-MM-DD hh:mm:ss'), '2008-02-21 00:00:00')
  t.deepEqual(m.format('YYYY年MM月DD日 hh:mm:ss'), '2008年02月21日 00:00:00')
  t.deepEqual(m.format('YYYY年MM月DD日hh:mm:ss'), '2008年02月21日00:00:00')
})

test('format as getters', t => {
  const m = miment('2008-02-21 12:34:56')
  t.deepEqual(m.format('YYYY'), '2008')
  t.deepEqual(m.format('MM'), '02')
  t.deepEqual(m.format('DD'), '21')
  t.deepEqual(m.format('hh'), '12')
  t.deepEqual(m.format('mm'), '34')
  t.deepEqual(m.format('ss'), '56')
})
