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

> 你也可以猛戳这里看example

**API 分为3大类**

第一类是返回其他对象的，比如format，返回的是字符串  json返回的是一个josn

第二类是返回miment对象的，你可以在调完一个api后面继续调用另一个api,也就是我们所说的链式调用  

第三类是从Date对象继承的，也就是说Date对象有的方法，miment也同样有，该类方法建议尽量少用

1. `format` **格式化时间** format方法也就是我们平时最常用的一个了，他一共接收2个参数，这2个参数都有默认值，不传就使用默认值

    |  参数名称   | 参数类型 | 参数默认值 | 是否必传  |   说明   |
    |-----------|---------|----------|----------|----------|
    |格式化的字符串|  string | 'YYYY-MM-DD hh:mm:ss' | N  |年YYYY,月MM,日DD,时hh,分mm,秒ss,毫秒SSS,数字星期ww,中文星期WW
    |是否是格式化一个时间差| boolean | false | N  | 比如你要计算的时间是一个倒计时，这个时候也就需要传true |
    
> 本着简单的原则，这里格式化方式没有做的太灵活有时候灵活也是一种学习成本，因为你需要记很多的用法，不是吗？,
**注意**格式化字符串区分大小写，记的技巧是大的单位大写 YYYY MM DD，小的单位小写 hh mm ss 毫秒跟星期特殊的单独记，
参数必须严格按照说明里面的填写，多一个或者少一个都认不到，比如YYYY写成YYY或者YY这样是识别不了的

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

    