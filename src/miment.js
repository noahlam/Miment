// 需要考虑polyfill情况
Object.setPrototypeOf = Object.setPrototypeOf ||
  function (obj, proto) {
    obj.__proto__ = proto;
    return obj;
  };

/**
 * 用了点技巧的继承，实际上返回的是Date对象
 */
function Miment() {
  // bind属于Function.prototype，接收的参数是：object, param1, params2...
  var dateInst = new (Function.prototype.bind.apply(Date, [Date].concat(Array.prototype.slice.call(arguments))))();
  // 更改原型指向，否则无法调用Miment原型上的方法
  // ES6方案中，这里就是[[prototype]]这个隐式原型对象，在没有标准以前就是__proto__
  Object.setPrototypeOf(dateInst, Miment.prototype);
  // 原型重新指回Date，否则根本无法算是继承
  Object.setPrototypeOf(Miment.prototype, Date.prototype);
  return dateInst;
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
function format(fmt, distance) {
  let dt = this
  if (fmt === null || fmt === undefined) {
    fmt = 'YYYY-MM-DD hh:mm:ss'
  }
  if (distance) {
    this.setHours(this.getHours() - 8)
    // 判断是不是负数
    if(this.valueOf() < 0) {
      dt = Miment(Math.abs(this.valueOf()))
    }
  }
  console.log('dt',dt)
  let year = String(dt.getFullYear())
  year = distance ? year - 1970 : year
  let month = String(dt.getMonth() + 1)
  let day = String(dt.getDate())

  let hour = String(dt.getHours())
  let minute = String(dt.getMinutes())
  let second = String(dt.getSeconds())
  let weekDay = dt.getDay()
  let milliSecond = dt.getMilliseconds()
  return fmt
    .replace('YYYY', year[1] ? year : `0${year}`)
    .replace('MM', month[1] ? month : `0${month}`)
    .replace('DD', day[1] ? day : `0${day}`)
    .replace('hh', hour[1] ? hour : `0${hour}`)
    .replace('mm', minute[1] ? minute : `0${minute}`)
    .replace('ss', second[1] ? second : `0${second}`)
    .replace('SSS', milliSecond)
    .replace('ww', weekDay)
    .replace('WW', weekArray[weekDay])
}
// 把时间转换成JSON对象
function json() {
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
function stamp() {
  return this.valueOf();
}
// 获取当前月的天数
function daysInMonth() {
  let year = this.getFullYear()
  let month = this.getMonth() + 1
  let date = Miment(year, month, 0)
  return date.getDate()
}

// 增加(或减少)时间
function add(amount, unit) {
  if(!amount) amount = 0
  switch (unit) {
    case 'YY':
    case 'YYYY':
      this.setFullYear(this.getFullYear() + amount);
      break
    case 'MM':
      this.setMonth(this.getMonth() + amount);
      break
    case 'DD':
      this.setDate(this.getDate() + amount);
      break
    case 'hh':
      this.setHours(this.getHours() + amount);
      break
    case 'mm':
      this.setMinutes(this.getMinutes() + amount);
      break
    case 'ss':
      this.setSeconds(this.getSeconds() + amount);
      break
    case 'SSS':
      this.setMilliseconds(this.getMilliseconds() + amount);
      break
    case 'ww':
    case 'WW':
      this.setDate(this.getDate() + amount * 7);
      break
  }
  return this
}
// 计算2个时间的差距
function distance(dt,dt2) {
  let dtNew = dt  ? Miment(dt).valueOf()  : Miment().valueOf()
  let dtOld = dt2 ? Miment(dt2).valueOf() : this.valueOf()
  return Miment(dtNew - dtOld)
}
// 获取每个月的第一天
function firstDay() {
  let year = this.getFullYear()
  let month = this.getMonth()
  return Miment(year, month, 1)
}
// 获取每个月的最后一天
function lastDay() {
  let year = this.getFullYear()
  let month = this.getMonth() + 1
  return Miment(year, month, 0)
}
// 获取 本周的第一天（周日）
function firstDayOfWeek() {
  this.setDate(this.getDate() - this.getDay());
  return this
}

module.exports = Miment