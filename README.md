### 介绍

Miment 是一个轻量级的时间库（打包压缩后只有1.2K）,没有太多的方法，
Miment的设计理念就是让你以几乎为零的成本快速上手，无需一遍一遍的撸文档

### 由来 

首先 致敬一下Moment，真的是非常完美的一个时间库，我本身也是Moment重度使用者，用习惯了Moment,
一碰到需要处理时间的需求，立马Moment,不过有时候想想，Moment给我们提供了那么多的功能，但是我们天天用的，
也就那么一两个，刚好最近在写微信小程序，然后在页面引入Moment，打包完，包竟然大了200多K，把Moment去掉，
就直接少掉200多K,反复试了好几次，确定一个Moment在小程序里面，占用大概200K的空间，于是就想自己写一个类似
Moment的精简的时间库，于是就有了这个，为什么要叫Miment呢，其实刚开始我是想叫Mini-Moment的，
但是考虑到以后可能会经常使用到，打2个单词中间还要加一个下划线太累了，所以就把Mini-Moment缩水成Miment了。

### 开始使用

如果你是直接在浏览器里面使用，请下载`./dist/miment-min.js`到你的项目里面去，然后在页面引入后即可直接使用miment
    
    <script src='你js存放的目录/miment-min.js'> </script>
    <script>
        miment().format()  //  2018-04-09 23:01:58 这是我写这篇文档的时候，运行代码显示的时间
    </script>

如果你是在单页面应用或者nodejs环境下使用,首先你需要使用安装一下Miment

    npm i miment
   
或者

    yarn add miment

然后就可以在你的项目中使用了

    import miment from 'miment'
    miment().format()

### API 

> 你也可以猛戳这里看[example](https://noahlam.github.io/Miment/)

**API 分为3大类**

第一类是返回其他对象的，比如format，返回的是字符串  json返回的是一个josn

第二类是返回miment对象的，你可以在调完一个api后面继续调用另一个api,也就是我们所说的链式调用  

第三类是从Date对象继承的，也就是说Date对象有的方法，miment也同样有，该类方法建议尽量少用

#### 第一类

1. `format` **格式化时间** ,format方法也就是我们平时最常用的一个了，他一共接收2个参数，这2个参数都有默认值，不传就使用默认值

    |  参数名称   | 参数类型 | 参数默认值 | 是否必传  |   说明   |
    |-----------|---------|----------|----------|----------|
    |格式化的字符串|  string | 'YYYY-MM-DD hh:mm:ss' | N  |年YYYY,月MM,日DD,时hh,分mm,秒ss,毫秒SSS,数字星期ww,中文星期WW
    |是否是格式化一个时间差| boolean | false | N  | 比如你要计算的时间是一个倒计时，这个时候也就需要传true |
    
    > 本着简单的原则，这里格式化方式没有做的太灵活,有时候灵活也是一种学习成本，因为你需要记很多的用法，不是吗？,
    **注意**格式化字符串区分大小写，记的技巧是大的单位大写 YYYY MM DD，小的单位小写 hh mm ss 毫秒跟星期特殊的单独记，
    参数必须严格按照说明里面的填写，多一个或者少一个都认不到，比如YYYY写成YYY或者YY这样是识别不了的

    > 第二个参数的用法可以参考 distance函数

    示例

        miment().format('YYYY年MM月DD日 hh:mm:ss')  // 2018-04-09 23:49:36
        miment().format('YYYY/MM/DD hh-mm-ss SSS') // 2018/04/09 23-49-36 568
        miment().format('YYYY年MM月DD日 星期WW')     // 2018年04月09日 星期一
        miment().format('YYYY年MM月DD日 星期ww')     // 2018年04月09日 星期1 (星期日这边会显示星期0)

    扩展一下，如果我们只是想获取年份或者月份或者日，可以这样用

        miment().format('YYYY')   // 2018
        miment().format('MM')     // 04
        miment().format('DD')     // 09
        miment().format('hh')     // 23
        miment().format('mm')     // 57
        miment().format('ss')     // 16
        miment().format('SSS')    // 063
        miment().format('ww')     // 1
        miment().format('WW')     // 一

    所以，有了这个方法，其实你可以不需要去记大部分原生的方法（getFUllYear,getDate,getDay...）,所有的需求一个format搞定，
    这就是我们追求的极简，当然，也会有一丢丢的性能损失，不过个人觉得对于当今的硬件设备，你完全可以忽略这一点点性能。除非你的项目很特殊。

2. `json` **输出json格式的时间**,不需要参数

    直接上代码

        miment().json()

    看输出

        {
            "year": 2018,
            "month": 4,
            "date": 11,
            "hour": 8,
            "minute": 57,
            "second": 41,
            "day": 3,
            "milliSecond": 87
        }

    输出内容比较简单，应该很好理解，这里就不对输出做介绍了，day返回的是星期几，从0-星期天 1-星期一，以此类推

3. `stamp` **输出时间戳**,不需要参数

        miment().stamp()

    看输出

        1523408529932

    会输出一串代表当前时间的数字，这个对前端基本没啥用，不过有时候后端的同学会要求传这个

4. `daysInMonth` **获取当前月的天数**,不需要参数

          miment().daysInMonth()   // 30

#### 第二类

5. `add` **增加或减少时间**,它接收2个参数

    |参数名称| 参数类型 | 参数默认值 | 是否必传  |   说明   |
    |-------|--------|-----------|---------|----------|
    |  增量 | number |      0     |   N    |要增加的时间量，增加传正数，减少传负数 |
    |增量单位| string |   无默认值  |   Y    | 要增加的时间单位，可选有YYYY MM DD hh mm ss SSS ww WW|

    > 单位 的可选参数跟格式化方法`format`的类似，这么做也是为了方便记忆，只需要记一套方案

    > **同样地** 单位也区分大小写，记的技巧是大的单位大写 YYYY MM DD，小的单位小写 hh mm ss 毫秒跟星期特殊的单独记，
    参数必须严格按照说明里面的填写，多一个或者少一个都认不到，比如YYYY写成YYY或者YY这样是识别不了的

        miment().add(1,'DD')  // 增加一天
        miment().add(1,'YYYY').add(2,'MM').add(-3,'DD')  // 增加1年2个月又减回去3天
        miment().add(-1,'ww')  // 减去一周 --即获取上周的日期
        miment().add(500,SSS)  // 增加500毫秒

    add返回的值是增加完后的miment对象，所以我们可以在它后面继续调用miment有的方法。

        miment().add(1,'DD').format()   // 我测试的时候，打印的是 2018-04-12 09:29:55

    需要注意的是，当你调完`第一类`的方法以后，返回的就不是miment对象了，比如`format`返回的是一个字符串，这个时候你就不能再调用miment上的方法了，
    会报错 `Uncaught TypeError: miment(...).format(...).xxx is not a function`  因为字符串的原型上面没有这个方法

        miment().add(1,'DD').format().add(1,'DD')  // 报错

6. `distance` **计算2个时间的距离** 接收2个参数，返回一个miment对象

    |参数名称| 参数类型 | 参数默认值 | 是否必传  |   说明   |
    |-------|--------|-----------|---------|----------|
    |起始时间 |miment/date/number/string | 无 | Y |接受4种类型参数，会自动转换|
    |结束时间 |miment/date/number/string | 无 | N |同上|

    > 只传一个起始时间的时候，返回 **起始时间 - miment当前时间**

    > 起始时间和结束时间都有传的时候，返回 **起始时间 - 结束时间**

        miment().distance('2018-04-10 00:00:00')  // Mon Dec 29 1969 22:11:51 GMT+0800 (CST)
        miment().distance(1523408529932)          // Wed Dec 31 1969 07:13:47 GMT+0800 (CST)

        miment().distance('2018-04-10 00:00:00', new Date())  //Mon Dec 29 1969 22:11:13 GMT+0800 (CST)
        miment().distance('2018-04-10 00:00:00', '2018-04-11 00:00:00')  //Mon Dec 29 1969 22:10:46 GMT+0800 (CST)

    你一定注意到了，distance方法返回的时间，竟然都是1969年的？ 这实际上是基于1970-01-01 00:00:00的一个毫秒数，
    具体请看 [百度百科-unix时间](https://baike.baidu.com/item/UNIX%E6%97%B6%E9%97%B4/8932323),
    而我们把两个时间相减，得到的可能是一个相对来说很小的数(还有可能是负数)，所以离1970很近

    那我们要怎么显示我们能看得懂的时间呢？ 很简单 用格式化时间函数format,还记得format函数的第二个参数吗？
    就是专门用来格式化distance计算出来的时间差，只要把第二个参数设为true,就能把当前时间格式化成时间差
    我们先来看看第二个参数不传，或者传false的时候是什么样子的

        miment().distance(1523408529932).format('YYYY年MM月DD日 hh时mm分ss秒')        // 1969年12月30日 00时52分16秒
        miment().distance(1523408529932).format('YYYY年MM月DD日 hh时mm分ss秒',false)  // 1969年12月30日 00时52分16秒

    然后我们把第二个参数设为true

        miment().distance(1523408529932).format('YYYY年MM月DD日 hh时mm分ss秒',true)  // 00年01月03日 23时08分23秒


7. `firstDayOfWeek` **获取 本周的第一天(周日)**  不需要参数

          miment().firstDayOfWeek()           // Sun Apr 08 2018 11:27:55 GMT+0800 (CST)
          miment().firstDayOfWeek().format()  // 2018-04-08 11:27:55

    如果想获取周一呢？周二、三、四、五、六呢？

          miment().firstDayOfWeek().add(1,'DD').format() // 2018-04-09 11:27:55

8. `firstDay`  **获取每个月的第一天** 不需要参数

        miment().firstDay()           // Sun Apr 01 2018 00:00:00 GMT+0800 (CST)
        miment().firstDay().format()  // 2018-04-01 00:00:00

9. `lastDay`  **获取每个月的最后一天** 不需要参数

        miment().lastDay()           // Mon Apr 30 2018 00:00:00 GMT+0800 (CST)
        miment().lastDay().format()  // 2018-04-30 00:00:00

#### 第三类

10. `Date自带方法` miment继承自Date对象，所以也拥有Date对象的所有方法，这里就不做深入讲解，需要更多关于Date对象的说明，
请移步至[MDN查看](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)

    > 不过需要注意的是，由于继承而来的方法是属于Date对象的，为了保持一致，我们没有去对方法做改动，所以方法无法返回miment对象，也就是说无法链式调用miment

### 写在最后
目前这些功能(函数)，是我们团队在日常实践中碰到的比较常用的，如果你对功能有新的需求或者建议，
欢迎给我们提[Issue](https://github.com/noahlam/Miment/issues),如果喜欢miment，
请在我的[github](https://github.com/noahlam/Miment)上给我一个star,你的star就是我最大的动力了，谢谢！