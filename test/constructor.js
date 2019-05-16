import test from 'ava'

import miment from '../src/miment'

test('constructor-RFC-2822', t => {
  const m = miment('Thu May 16 2019 09:49:07 GMT+0800')
  t.deepEqual(m.valueOf(), 1557971347000)
})

test('constructor-ISO-8601', t => {
  const m = miment('2019-05-15T17:48:53.000+0800')
  t.deepEqual(m.valueOf(), 1557913733000)
})
