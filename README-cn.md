# Miment


## 介绍
Miment ("Mini Moment") 是一个轻量级的时间库，打包压缩后体积 ~1K，没有过多的方法。它的上手成本几乎为零，无需反复查阅文档。当你只需要 Moment 的若干核心能力但又不希望使你的包体积膨胀时，欢迎尝试 Miment。

[![Build Status](https://travis-ci.org/noahlam/Miment.svg?branch=master)](https://travis-ci.org/noahlam/Miment)
[![Badge Size](https://img.badgesize.io/https://unpkg.com/miment/dist/miment-min.js?compression=gzip&amp;label=size&amp;maxAge=300)](https://unpkg.com/miment/dist/miment-min.js)
[![Version](https://img.shields.io/npm/v/miment.svg?maxAge=300&label=version&colorB=007ec6&maxAge=300)](./package.json)
[![LICENSE](https://img.shields.io/npm/l/miment.svg?maxAge=300)](./LICENSE)

* [English README](./README.md)
* [更新日志](./update_log.md)
* [查看示例](https://noahlam.github.io/Miment)

>  首先致敬一下 Moment，非常好用的一个时间库。我本身也是 Moment 重度使用者，用习惯了 Moment，一碰到需要处理时间的需求立马 Moment。不过有时候想想，Moment 给我们提供了那么多的功能，但是我们天天用的，也就那么一两个。刚好最近在写微信小程序，然后在页面引入 Moment，打包完，包竟然大了 200 多 K，把 Moment 去掉，就直接少掉 200 多 K。反复试了好几次，确定一个 Moment 在小程序里面，占用大概 200K 的空间。于是就想自己写一个类似 Moment 的精简的时间库，于是就有了这个。为什么要叫 Miment 呢？其实刚开始我是想叫 Mini-Moment 的，但是考虑到以后可能会经常使用到，打 2 个单词中间还要加一个横杆太累了，所以就把 Mini-Moment 缩水成 Miment 了。



## 安装
对浏览器环境，在页面引入 `./dist/miment-min.js` 即可：

``` html
<script src="https://unpkg.com/miment/dist/miment-min.js"></script>
<script>
  miment().format('YYYY/MM/DD hh-mm-ss SSS') // 2018/04/09 23-49-36 568
</script>
```

在 NPM 生态中使用时，请使用包管理器安装 Miment：

```
npm i miment
```

然后就可以在你的项目中使用了：

``` js
import miment from 'miment'
miment().format('YYYY/MM/DD hh-mm-ss SSS') // 2018/04/09 23-49-36 568
```

## API

API 方法可分为三类：

* 返回 Computed 结果的方法。如 `format` 返回字符串，`json` 返回的是一个 JSON 对象。
* 返回 `Miment` 对象的方法，即支持链式调用。
* 从 Date 对象继承的方法。Date 对象上的方法 miment 也可以使用，这些方法类似私有 API，不推荐直接使用。


### 返回 Computed 结果的方法

#### `format`
format 方法几乎是我们平时最常用的了。它一共接收 2 个参数，这 2 个参数都有默认值，不传则使用默认值：

<table>
  <tr>
    <td>参数名称</td>
    <td>参数类型</td>
    <td>参数默认值</td>
    <td>是否必传</td>
    <td>说明</td>
  </tr>
  <tr>
    <td>格式化的字符串</td>
    <td>string</td>
    <td>'YYYY-MM-DD hh:mm:ss'</td>
    <td>N</td>
    <td>
      年 YYYY<br>
      月 MM<br>
      日 DD<br>
      时 hh<br>
      分 mm<br>
      秒 ss<br>
      毫秒 SSS<br>
      数字星期 ww<br>
      中文星期 WW
    </td>
  </tr>
  <tr>
    <td>是否为时间差</td>
    <td>boolean</td>
    <td>false</td>
    <td>N</td>
    <td>格式化 distance 时间差时，使用 true</td>
  </tr>
</table>

* 本着简单的原则，我们没有实现特别灵活的格式化方式。有时灵活也意味着学习成本：你需要记忆更多的用法，不是吗？
* 格式化字符串**区分大小写**，记忆技巧是日期大写如 `YYYY MM DD`，时间小写如 `hh mm ss`，毫秒跟星期特殊的单独记。参数格式需严格匹配，长度过多或过少均无效，如 `YYYY` 写成 `YYY` 或 `YY` 均无效。
* 对第二个参数的使用，参见 `distance` 方法。

``` js
miment().format() // 2018-04-09 23:49:36
// 2018-04-09 23:49:36

miment().format('YYYY/MM/DD hh-mm-ss SSS')
// 2018/04/09 23-49-36 568

miment().format('YYYY年MM月DD日 星期WW')
// 2018年04月09日 星期一

miment().format('YYYY年MM月DD日 星期ww')
// 2018年04月09日 星期1 *周日对应星期0*
```

作为扩展，如果我们只想获取单独的年、月或日，可这样使用：

``` js
miment().format('YYYY') // 2018
miment().format('MM') // 04
miment().format('DD') // 09
miment().format('hh') // 23
miment().format('mm') // 57
miment().format('ss') // 16
miment().format('SSS') // 063
miment().format('ww') // 1
miment().format('WW') // 一
```

基于这个方法，你可以不需要记忆大部分原生的日期方法（如 `getFullYear` / `getDate` / `getDay` 等），使用统一的 `format` 处理各种需求。

#### `json`
输出 JSON 格式的时间字段：

``` js
miment().json()
```

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

#### `diff` 计算两个时间的毫秒差

```js
miment('2018-05-05 00:00:00').diff('2018-05-05 00:00:01')
// -1000
miment().diff('2018-05-05 00:00:00','2018-05-05 00:00:01')
// -1000
```

#### `stamp`
输出时间戳，不需参数。

``` js
miment().stamp()
// 1523408529932
```

#### `get`
输出给定单位的时间值 参数跟返回值都跟format一样,但是性能比format好很多
```js
miment().get('YYYY')
// 2018
```
#### `daysInMonth`
获取当前 `Miment` 对象所在月的天数。

``` js
miment().daysInMonth()
// 30
```
#### `isBefore` 接收一个参数作为`被比较的时间`
判断当前时间 是否早于参数 返回一个布尔值

``` js
miment().isBefore('2000-01-01')
// false
miment().isBefore('2020-01-01')
// true
```
#### `isAfter` 接收一个参数作为`被比较的时间`
判断当前时间 是否晚于参数 返回一个布尔值

``` js
miment().isAfter('2000-01-01')
// true
miment().isAfter('2020-01-01')
// false
```
#### `isBetween` 接收两个参数作为`被比较的时间`
判断当前时间 是否介于两个参数之间,参数不分先后顺序，两个参数位置可以任意对调

``` js
miment().isBetween('2000-01-01','2020-01-01')
// true
```

### 支持链式调用的方法

#### `add` 和 `sub`
增加或减少时间。它们接收 2 个参数：

<table style='border-collapse:collapse;'>
  <tr>
    <td>参数名称</td>
    <td>参数类型</td>
    <td>参数默认值</td>
    <td>是否必传</td>
    <td>说明</td>
  </tr>
  <tr>
    <td>增量</td>
    <td>number</td>
    <td>0</td>
    <td>N</td>
    <td>要增加的时间量，增加传正数，减少传负数</td>
  </tr>
  <tr>
    <td>单位</td>
    <td>string</td>
    <td>无默认值</td>
    <td>Y</td>
    <td>
      要增加的时间单位<br>
      可选同 format 格式化字符串</td>
  </tr>
</table>

为方便使用，**单位**的可选参数格式与格式化方法 `format` 的保持一致。同样严格匹配大小写与长度。

``` js
miment().add(1, 'DD') // 增加一天
miment().add(1, 'YYYY').add(2, 'MM').add(-3, 'DD') // 增加 1 年 2 个月又减回 3 天
miment().add(-1, 'ww') // 减去一周，即获取上周的日期
miment().add(500,SSS) // 增加 500 毫秒
```

`add` 和 `sub` 返回的值是`增加/减少`完后的 `Miment` 对象，我们可以在它后面继续调用 mimont 支持的方法:

``` js
miment().add(1, 'DD').format()
// 2018-04-12 09:29:55
```

需要注意的是，当你调完返回 Computed 结果的方法后，返回的对象类型不是 `Miment`，故而不支持链式调用：

```
miment().add(1, 'DD').format().add(1, 'DD') // 报错
```

#### `set`
设置当前时间为一个固定值,用法跟参数都同`add/sub`
``` js
miment('2018-05-05 00:00:00').set(1999, 'YYYY').format()
// 1999-05-05 00:00:00
```

#### `distance`
计算 2 个时间的距离。它接收 2 个参数，返回一个 `Miment` 对象：

<table style='border-collapse:collapse;'>
  <tr>
    <td>参数名称</td>
    <td>参数类型</td>
    <td>参数默认值</td>
    <td>是否必传</td>
    <td>说明</td>
  </tr>
  <tr>
    <td>起始时间</td>
    <td>miment/date/number/string</td>
    <td>无</td>
    <td>Y</td>
    <td>接受4种类型参数，会自动转换</td>
  </tr>
  <tr>
    <td>结束时间</td>
    <td>miment/date/number/string</td>
    <td>无</td>
    <td>N</td>
    <td>同上</td>
  </tr>
</table>

* 只传一个起始时间时，返回 **起始时间 - miment 当前时间**
* 提供起始时间和结束时间时，返回 **起始时间 - 结束时间**。相减顺序如何？先出现的减去后出现的：

``` js
miment().distance('2018-04-10 00:00:00')
// Mon Dec 29 1969 22:11:51 GMT+0800 (CST)

miment().distance(1523408529932)
// Wed Dec 31 1969 07:13:47 GMT+0800 (CST)
```

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

你一定注意到了，为什么 `distance` 方法返回的年份是 1969 年呢？这实际上是基于`1970-01-01 00:00:00` 的毫秒数，参见 [Unix 时间](https://en.wikipedia.org/wiki/Unix_time)，而我们把两个时间相减，得到的可能是一个相对很小的时间戳（还可能是负数)，所以离 1970 很近。

那我们要怎么显示我们能看得懂的时间呢？配合 `format` 即可。`format` 的第二个参数是用于用来格式化 `distance` 计算出的时间差，只要把第二个参数设为 `true`，即可将当前时间格式化成时间差。作为对比：

``` js
miment().distance(1523408529932).format('YYYY年MM月DD日 hh时mm分ss秒')
// 1969年12月30日 00时52分16秒

miment().distance(1523408529932).format('YYYY年MM月DD日 hh时mm分ss秒', false)
// 1969年12月30日 00时52分16秒
```

把第二个参数设为 `true`：

``` js
miment().distance(1523408529932).format('YYYY年MM月DD日 hh时mm分ss秒', true)
// 00年01月03日 23时08分23秒
```

#### `firstDayOfWeek`
获取本周的第一天（周日），无参数：

``` js
miment().firstDayOfWeek() // Sun Apr 08 2018 11:27:55 GMT+0800 (CST)
miment().firstDayOfWeek().format() // 2018-04-08 11:27:55
```

如果想获取周一呢？周二、三、四、五、六呢？

``` js
miment().firstDayOfWeek().add(1, 'DD').format()
// 2018-04-09 11:27:55
```

#### `firstDay`
获取每个月的第一天，无参数：

``` js
miment().firstDay() // Sun Apr 01 2018 00:00:00 GMT+0800 (CST)
miment().firstDay().format() // 2018-04-01 00:00:00
```

#### `lastDay`
获取每个月的最后一天，无参数：

``` js
miment().lastDay()
// Mon Apr 30 2018 00:00:00 GMT+0800 (CST)

miment().lastDay().format()
// 2018-04-30 00:00:00
```

### Date 自有方法

`Miment` 继承自 Date 对象，所以也拥有 Date 对象的所有方法。请移步至 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 查看。

需要注意的是，由于继承而来的方法是属于 Date 对象的，为保持一致，我们没有对方法做改动。故而方法无法返回 miment 对象，也无法链式调用 miment。


## 许可
MIT

## 写在最后
目前这些功能（函数），是我们团队在日常实践中碰到的比较常用的。如果你对功能有新的需求或者建议，欢迎给我们提 [Issue](https://github.com/noahlam/Miment/issues)。如果喜欢 miment，请在我的 [GitHub](https://github.com/noahlam/Miment) 上给我一个 star，你的 star 就是我最大的动力了，谢谢！
