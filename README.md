# Miment

Miment is an aero-weigh time library (~1KB minified) but get things done efficiently.

[![Build Status](https://travis-ci.org/noahlam/Miment.svg?branch=master)](https://travis-ci.org/noahlam/Miment)
[![Badge Size](https://img.badgesize.io/https://unpkg.com/miment/dist/miment-min.js?compression=gzip&amp;label=size&amp;maxAge=300)](https://unpkg.com/miment/dist/miment-min.js)
[![Version](https://img.shields.io/npm/v/miment.svg?maxAge=300&label=version&colorB=007ec6&maxAge=300)](./package.json)
[![LICENSE](https://img.shields.io/npm/l/miment.svg?maxAge=300)](./LICENSE)


* [中文 README](./README-cn.md)
* [Update log](./update_log.md)
* [Example](https://noahlam.github.io/Miment/)


### Why

Moment is an **extraordinary** time library that almost covers everything you need, with a massive (200KB+) size. Suppose 90% of its daily usage can be fulfilled within 1% codebase, this tradeoff can be worthwhile. So there comes miment as "mini-moment".


## Install
For NPM environment:

```
npm i miment
```

Import into codebase and go:

``` js
import miment from 'miment'
miment().format('YYYY/MM/DD hh-mm-ss SSS') // 2018/04/09 23-49-36 568
```

For browser usage, simply include `./dist/miment-min.js`:

``` html
<script src="https://unpkg.com/miment/dist/miment-min.js"></script>
<script>
  miment().format('YYYY/MM/DD hh-mm-ss SSS') // 2018/04/09 23-49-36 568
</script>
```


## Walkthrough
* [Format Time](#format-time)
* [Calculate Time](#calculate-time)

### Format Time
For most daily usage, `format` is what you need:

``` js
miment().format() // 2018-04-09 23:49:36
miment().format('YYYY/MM/DD hh-mm-ss SSS') // 2018/04/09 23-49-36 568
miment().format('YYYY年MM月DD日 星期WW') // 2018年04月09日 星期一
miment().format('YYYY年MM月DD日 星期ww') // 2018年04月09日 星期1 *周日对应星期0*
```

What if you only what to get a date field?

``` js
miment().format('YYYY') // '2018'
miment().format('MM') // '04'
miment().format('DD') // '09'
// ...
```

For JSON format, `miment().json()` yields:

``` json
{
  "year": 2018,
  "month": 4,
  "date": 11,
  "hour": 8,
  "minute": 57,
  "second": 41,
  "day": 3,
  "millisecond": 87
}
```

For other output formats, you can have `miment().stamp()` for timestamp, and `miment().daysInMonth()` for days count in corresponding month.

### Calculate Time
What's the date 10 days after? `add` is what you need:

``` js
miment().add(1,'DD') // next day
miment().add(1, 'YYYY').add(2, 'MM').add(-3, 'DD') // chaining
miment().add(-1,'ww') // date last week
miment().add(500,SSS) // add 500ms
```

> Remember not to chain `add()` after `format()`, since `format()` returns string instead of miment instance:
> 
> ``` js
> miment().add(1, 'DD').format().add(1, 'DD') // Error!
> ```

How to count distance between 2 dates? You have `distance`:

``` js
miment().distance('2018-04-11 00:00:00')
// Thu Jan 08 1970 21:04:50 GMT+0800 (CST)
```

By default the instance returned by `distance` is resolved as unix timestamp relative to 1970 "epoch". In this case, use second argument for `format` API on formatting:

``` js
miment().distance(1523408529932).format('YYYY/MM/DD')
// wrong: '1970/01/08'

miment().distance('2018-04-11 00:00:00').format('YYYY/MM/DD', true)
// correct: '0/00/07'
```

For other common calculation, see [reference](#reference).


## Reference


### Factory

#### `miment`
`miment(string?|Date?) => Miment`

For miment instance methods, there are basically 3 kinds of methods available:

* Chainable methods **returning `Miment` instance**, e.g., `add` and `distance`.
* Unchainable methods **returning computed values**, e.g., `format` and `json`.
* Methods inherited from native `Date` model.

### Chainable

#### `add`
`add(amount: number, unit: string) => Miment`

Get `Miment` object with offset date added.

``` js
miment().add(1, 'DD')
miment().add(1, 'YYYY').add(2, 'MM').add(-3, 'DD')
miment().add(-1, 'ww')
miment().add(500,SSS)
```

#### `distance`
`distance(dt: Miment|Date|string, dt2: Miment?|Date?|string?) => Miment`

Get `Miment` object measuring distance between two dates. If only one argument is provided, it returns distance between that time and current time.

To get the formatted result, please `format` it with the second `true` flag.

``` js
miment().distance('2018-04-10 00:00:00')
// Mon Dec 29 1969 22:11:51 GMT+0800 (CST)

miment().distance(1523408529932)
// Wed Dec 31 1969 07:13:47 GMT+0800 (CST)

miment().distance('2018-04-10 00:00:00', new Date())
// Mon Dec 29 1969 22:11:13 GMT+0800 (CST)

miment().distance('2018-04-10 00:00:00', '2018-04-11 00:00:00')
// Mon Dec 29 1969 22:10:46 GMT+0800 (CST)
```

#### `firstDayOfWeek`
`firstDayOfWeek() => Miment`

Get `Miment` object representing first day (Sunday) of the week. For other weekday, simply chaining it with `add`.

``` js
miment().firstDayOfWeek()
// Sun Apr 08 2018 11:27:55 GMT+0800 (CST)

miment().firstDayOfWeek().format()
// 2018-04-08 11:27:55
```

#### `firstDay`
`firstDay() => Miment`

Get `Miment` object representing first day of the month.

``` js
miment().firstDay()
// Sun Apr 01 2018 00:00:00 GMT+0800 (CST)

miment().firstDay().format()
// 2018-04-01 00:00:00
```

#### `lastDay`
`firstDay() => Miment`

Get `Miment` object representing last day of the month.

``` js
miment().lastDay()           // Mon Apr 30 2018 00:00:00 GMT+0800 (CST)
miment().lastDay().format()  // 2018-04-30 00:00:00
```

### Computed

#### `format`
`format(formatter: string?, distance: boolean) => string`

Format `Miment` into string. Support combination of following formats: "YYYY MM DD hh mm ss SSS ww WW". Pass `distance` flag as `true` if you are formatting results from `distance()`.

#### `json`
`json() => Object`

Get JSON object for date fields.

``` json
{
  "year": 2018,
  "month": 4,
  "date": 11,
  "hour": 8,
  "minute": 57,
  "second": 41,
  "day": 3,
  "millisecond": 87
}
```

#### `stamp`
`stamp() => number`

Get timestamp of `Miment` object.

### Date API
All [Date instance APIs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) are inherited. For now it's not recommended to use it since they're unchainable.


## License
MIT

---

Please [star](https://github.com/noahlam/Miment) this repo if you like, and feel free to submit [issues](https://github.com/noahlam/Miment/issues), thanks!
