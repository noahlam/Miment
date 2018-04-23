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

Miment.prototype.format = format
Miment.prototype.stamp = stamp
Miment.prototype.json = json

Miment.prototype.daysInMonth = daysInMonth

Miment.prototype.add = add
Miment.prototype.distance = distance

Miment.prototype.firstDay = firstDay
Miment.prototype.lastDay = lastDay
Miment.prototype.firstDayOfWeek = firstDayOfWeek

// 转换成星期的数组
const weekArray = ['日', '一', '二', '三', '四', '五', '六']

// 格式化时间
function format (formatter = 'YYYY-MM-DD hh:mm:ss', distance = false) {
  let year, month, day, hour, minute, second, weekDay, milliSecond

  if (distance) {
    let  dtBegin, dtEnd
    if(this.__distance_begin__ > this.__distance_end__){
      dtBegin = Miment(this.__distance_begin__)
      dtEnd = Miment(this.__distance_end__)
    } else {
      dtBegin = Miment(this.__distance_end__)
      dtEnd = Miment(this.__distance_begin__)
    }
    // 时间差的格式化
    year =dtBegin.getFullYear() - dtEnd.getFullYear()
    month = dtBegin.getMonth() - dtEnd.getMonth()
    day = dtBegin.getDate() - dtEnd.getDate()
    hour = dtBegin.getHours() - dtEnd.getHours()
    minute = dtBegin.getMinutes() - dtEnd.getMinutes()
    second = dtBegin.getSeconds() - dtEnd.getSeconds()
    weekDay = Math.abs(dtBegin.getDay() - dtEnd.getDay())
    milliSecond = Math.abs(dtBegin.getMilliseconds() - dtEnd.getMilliseconds())
    if(milliSecond < 0) {
      milliSecond += 1000
      second --
    }
    if(second < 0) {
      second += 60
      minute --
    }
    if(minute < 0) {
      minute += 60
      hour --
    }
    if(hour < 0) {
      hour += 24
      day --
    }
    if(day < 0) {
      day += dtEnd.daysInMonth()
      month --
    }
    if(month < 0) {
      month += 12
      year --
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
    milliSecond = this.getMilliseconds()
  }
  // 替换并返回格式化后的值
  formatter = formatter
    .replace('YYYY', year)
    .replace('MM', String(month)[1] ? month : `0${month}`)
    .replace('DD', String(day)[1] ? day : `0${day}`)
    .replace('hh', String(hour)[1] ? hour : `0${hour}`)
    .replace('mm', String(minute)[1] ? minute : `0${minute}`)
    .replace('ss', String(second)[1] ? second : `0${second}`)
    .replace('SSS', milliSecond)
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
  let milliSecond = this.getMilliseconds()
  return {
    year: year,
    month: month,
    date: date,
    hour: hour,
    minute: minute,
    second: second,
    day: day,
    milliSecond: milliSecond
  }
}

// 转换为时间戳
function stamp () {
  return this.valueOf()
}

// 获取当前月的天数
function daysInMonth () {
  let year = this.getFullYear()
  let month = this.getMonth() + 1
  let date = Miment(year, month, 0)
  return date.getDate()
}

// 增加或减少时间
function add (amount, unit) {
  if (!amount) amount = 0
  switch (unit) {
    case 'YY':
    case 'YYYY':
      this.setFullYear(this.getFullYear() + amount)
      break
    case 'MM':
      this.setMonth(this.getMonth() + amount)
      break
    case 'DD':
      this.setDate(this.getDate() + amount)
      break
    case 'hh':
      this.setHours(this.getHours() + amount)
      break
    case 'mm':
      this.setMinutes(this.getMinutes() + amount)
      break
    case 'ss':
      this.setSeconds(this.getSeconds() + amount)
      break
    case 'SSS':
      this.setMilliseconds(this.getMilliseconds() + amount)
      break
    case 'ww':
    case 'WW':
      this.setDate(this.getDate() + amount * 7)
      break
  }
  return this
}

// 计算两个时间距离
function distance (dt, dt2) {
  let dtBegin, dtEnd
  if (dt2) {
    dtBegin = Miment(dt).valueOf()
    dtEnd = Miment(dt2).valueOf()
  } else {
    dtBegin = this.valueOf()
    dtEnd = Miment(dt).valueOf()
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

module.exports = Miment
