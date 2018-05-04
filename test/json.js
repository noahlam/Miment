import test from 'ava'

import miment from '../src/miment'

test('json api', t => {
  const m = miment('2008-02-21 12:34:56')
  t.deepEqual(m.json('YYYY/MM/DD hh:mm:ss'), {
    date: 21,
    day: 4,
    hour: 12,
    millisecond: 0,
    minute: 34,
    month: 2,
    second: 56,
    year: 2008
  })
})
