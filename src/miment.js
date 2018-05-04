// polyfill
Object.setPrototypeOf = Object.setPrototypeOf ||
  function (obj, proto) {
    // eslint-disable-next-line
    obj.__proto__ = proto
    return obj
  }

/**
 * Miment 对象
 */
function Miment () {
  // 兼容苹果系统不识别 2018-01-01 的问题
  if (typeof arguments[0] === 'string') arguments[0] = arguments[0].replace(/-/g, '/')
  // bind 属于 Function.prototype
  // 接收参数形如 object, param1, params2...
  var dateInst = new (Function.prototype.bind.apply(Date, [Date].concat(Array.prototype.slice.call(arguments))))()
  // 更改原型指向，否则无法调用 Miment 原型上的方法
  // ES6 方案中，这里就是 [[prototype]] 隐式原型对象，在没有标准以前就是 __proto__
  Object.setPrototypeOf(dateInst, Miment.prototype)
  // 原型重新指回 Date
  Object.setPrototypeOf(Miment.prototype, Date.prototype)
  return dateInst
}

// 转换成星期的数组
const weekArray = ['日', '一', '二', '三', '四', '五', '六']

// 格式化时间
function format (formatter = 'YYYY-MM-DD hh:mm:ss', distance = false) {
  let year, month, day, hour, minute, second, weekDay, millisecond

  if (distance) {
    let dtBegin, dtEnd
    if (this.__distance_begin__ > this.__distance_end__) {
      dtBegin = Miment(this.__distance_begin__)
      dtEnd = Miment(this.__distance_end__)
    } else {
      dtBegin = Miment(this.__distance_end__)
      dtEnd = Miment(this.__distance_begin__)
    }
    // 时间差的格式化
    year = dtBegin.getFullYear() - dtEnd.getFullYear()
    month = dtBegin.getMonth() - dtEnd.getMonth()
    day = dtBegin.getDate() - dtEnd.getDate()
    hour = dtBegin.getHours() - dtEnd.getHours()
    minute = dtBegin.getMinutes() - dtEnd.getMinutes()
    second = dtBegin.getSeconds() - dtEnd.getSeconds()
    weekDay = Math.abs(dtBegin.getDay() - dtEnd.getDay())
    millisecond = Math.abs(dtBegin.getMilliseconds() - dtEnd.getMilliseconds())
    if (millisecond < 0) {
      millisecond += 1000
      second--
    }
    if (second < 0) {
      second += 60
      minute--
    }
    if (minute < 0) {
      minute += 60
      hour--
    }
    if (hour < 0) {
      hour += 24
      day--
    }
    if (day < 0) {
      day += dtEnd.daysInMonth()
      month--
    }
    if (month < 0) {
      month += 12
      year--
    }
  } else {
    // 普通的格式化
    year = this.getFullYear()
    month = this.getMonth() + 1
    day = this.getDate()
    hour = this.getHours()
    minute = this.getMinutes()
    second = this.getSeconds()
    weekDay = this.getDay()
    millisecond = this.getMilliseconds()
  }
  // 替换并返回格式化后的值
  formatter = formatter
    .replace('YYYY', year)
    .replace('MM', String(month)[1] ? month : `0${month}`)
    .replace('DD', String(day)[1] ? day : `0${day}`)
    .replace('hh', String(hour)[1] ? hour : `0${hour}`)
    .replace('mm', String(minute)[1] ? minute : `0${minute}`)
    .replace('ss', String(second)[1] ? second : `0${second}`)
    .replace('SSS', millisecond)
    .replace('ww', weekDay)
  formatter = distance ? formatter.replace('WW', weekDay) : formatter.replace('WW', weekArray[weekDay])
  return formatter
}

// 将时间转换为 JSON 对象
function json () {
  let year = this.getFullYear()
  let month = this.getMonth() + 1
  let date = this.getDate()

  let hour = this.getHours()
  let minute = this.getMinutes()
  let second = this.getSeconds()
  let day = this.getDay()
  let millisecond = this.getMilliseconds()
  return {
    year: year,
    month: month,
    date: date,
    hour: hour,
    minute: minute,
    second: second,
    day: day,
    millisecond: millisecond
  }
}

// 获取
function _get (unit) {
  switch (unit) {
    case 'YYYY': return this.getFullYear()
    case 'MM': return this.getMonth() + 1
    case 'DD': return this.getDate()
    case 'hh': return this.getHours()
    case 'mm': return this.getMinutes()
    case 'ss': return this.getSeconds()
    case 'ww':
    case 'WW': return this.getDay()
    case 'SSS': return this.getMilliseconds()
  }
  return '00'
}

function get (unit) {
  let res = String(_get.call(this, unit))
  return res[1] || unit === 'SSS' || unit === 'millisecond' ? res : `0${res}`
}

// 转换为时间戳
function stamp () {
  return this.valueOf()
}

// 计算2个时间的毫秒差
function diff (dt1, dt2) {
  if (dt2) {
    return Miment(dt1).valueOf() - Miment(dt2).valueOf()
  } else {
    return this.valueOf() - Miment(dt1).valueOf()
  }
}

// 获取当前月的天数
function daysInMonth () {
  let year = this.getFullYear()
  let month = this.getMonth() + 1
  let date = Miment(year, month, 0)
  return date.getDate()
}

// 判断当前时间是否早于 参数里的时间
function isBefore (dt) {
  return this.valueOf() < Miment(dt).valueOf()
}

// 判断当前时间是否晚于 参数里的时间
function isAfter (dt) {
  return this.valueOf() > Miment(dt).valueOf()
}

// 判断当前时间是否在 参数里的2个时间之间
function isBetween (dt1, dt2) {
  dt1 = Miment(dt1).valueOf()
  dt2 = Miment(dt2).valueOf()
  let dt = this.valueOf()
  return (dt1 > dt && dt2 < dt) || (dt1 < dt && dt2 > dt)
}

// 内部方法 计算时间
function _calculateTime (amount, unit, isSet) {
  switch (unit) {
    case 'YY':
    case 'YYYY':
      amount = isSet ? amount : this.getFullYear() + amount
      this.setFullYear(amount)
      break
    case 'MM':
      amount = isSet ? amount - 1 : this.getMonth() + amount
      this.setMonth(amount)
      break
    case 'DD':
      amount = isSet ? amount : this.getDate() + amount
      this.setDate(amount)
      break
    case 'hh':
      amount = isSet ? amount : this.getHours() + amount
      this.setHours(amount)
      break
    case 'mm':
      amount = isSet ? amount : this.getMinutes() + amount
      this.setMinutes(amount)
      break
    case 'ss':
      amount = isSet ? amount : this.getSeconds() + amount
      this.setSeconds(amount)
      break
    case 'SSS':
      amount = isSet ? amount : this.getMilliseconds() + amount
      this.setMilliseconds(amount)
      break
    case 'ww':
    case 'WW':
      if (isSet) {
        this.setMonth(0)
        this.setDate(1)
        this.setDate(amount * 7)
        firstDayOfWeek.call(this)
      } else {
        this.setDate(this.getDate() + amount * 7)
      }
      break
  }
}

// 增加或减少时间
function add (amount, unit) {
  if (!amount) amount = 0
  _calculateTime.call(this, amount, unit)
  return this
}

// 增加或减少时间
function sub (amount, unit) {
  if (!amount) amount = 0
  _calculateTime.call(this, -amount, unit)
  return this
}
// 设置时间
function set (amount, unit) {
  if (!amount) amount = 0
  _calculateTime.call(this, amount, unit, true)
  return this
}
// 计算两个时间距离
function distance (dt1, dt2) {
  let dtBegin, dtEnd
  if (dt2) {
    dtBegin = Miment(dt1).valueOf()
    dtEnd = Miment(dt2).valueOf()
  } else {
    dtBegin = this.valueOf()
    dtEnd = Miment(dt1).valueOf()
  }
  let m = Miment(dtBegin - dtEnd)
  m.__distance_begin__ = dtBegin
  m.__distance_end__ = dtEnd
  return m
}

// 获取每个月的第一天
function firstDay () {
  let year = this.getFullYear()
  let month = this.getMonth()
  return Miment(year, month, 1)
}

// 获取每个月的最后一天
function lastDay () {
  let year = this.getFullYear()
  let month = this.getMonth() + 1
  return Miment(year, month, 0)
}

// 获取本周的第一天（周日）
function firstDayOfWeek () {
  this.setDate(this.getDate() - this.getDay())
  return this
}

Miment.prototype.format = format
Miment.prototype.stamp = stamp
Miment.prototype.json = json
Miment.prototype.get = get
Miment.prototype.diff = diff

Miment.prototype.isBefore = isBefore
Miment.prototype.isAfter = isAfter
Miment.prototype.isBetween = isBetween

Miment.prototype.daysInMonth = daysInMonth

Miment.prototype.add = add
Miment.prototype.sub = sub
Miment.prototype.set = set
Miment.prototype.distance = distance

Miment.prototype.firstDay = firstDay
Miment.prototype.lastDay = lastDay
Miment.prototype.firstDayOfWeek = firstDayOfWeek

module.exports = Miment
