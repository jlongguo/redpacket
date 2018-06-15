"use strict";

function Redpacket() {
    this.t,
        this.timer,
        this.config = {
            start: 1,
            end: 10,
            monitor: 1,
            output: 10,
            top: "40%",
            left: "25%",
            multiple: 3,
            negative: true,
            animatefirstTime: 15,
            animatesecondTime: 15,
            url: 'http://union-click.jd.com/jdc?e=0&p=AyIEVB9rFDITNxFEA0tdIl4QXhoeHAxFBUYPCllHGAdFBwtSQEJLcitMV1pFIEVedB1LQglGVVFdSlkKawlQekcLVxpdHAAiDioZBVNpYVk2aDlSS05uHWAjEmFAZ1kXNRYDEg5JGlwJAhcWVRtQEAAZB1crXhYGFQFXGVscMhIGVBpaEgsVBFYraxUDIkw7',
            imgSrc: ['./jd_50.png', './jd_100.png', './jd_200.png', './jd_300.png', './jd_500.png']
        }
}
Redpacket.prototype = {
    init: function(ele, options) {
        var e = this;
        if (options) {
            e.config.start = options.start, //红包生成时间
                e.config.end = options.end, //浮层结束时间
                e.config.monitor = options.monitor, //监控时间
                e.config.output = options.output, //红包个数
                e.config.top = options.top, //生成红包的top位置
                e.config.left = options.left, //生成红包的left位置
                e.config.negative = options.negative, //撒红包的方式true为向下，false向上
                e.config.imgSrc = options.imgSrc //红包图片路径数组
            e.config.multiple = options.multiple //控制红包撒出的角度值越大角度越小
            e.config.animatefirstTime = options.animatefirstTime //撒出红包动画时间
            e.config.animatesecondTime = options.animatesecondTime //撒出红包动画时间
            e.config.url = options.url //链接地址
        }
        e.t = setInterval(function() {
            $(ele).find('li').each(function(i, obj) {
                if ($(obj).offset().top > $(window).height()) {
                    $(obj).remove()
                }
                $(obj)
                    .hover(function() {
                        $(this).css({
                            zIndex: 9999,
                            animation: 'none',
                            transform: 'none'
                        }).stop(true)
                    }, function() {
                        $(this).remove();
                    })
            })
        }, e.config.monitor * 1000)
        e.timer = setInterval(function() { e.run(ele) }, e.config.start * 1000);
        setTimeout(function() { e.destroy(ele) }, e.config.end * 1000)
    },
    run: function(ele) {
        var e = this;
        for (var i = 0; i < e.config.output; i++) {
            e.computed(i, ele)
        }
    },
    destroy: function(ele) {
        var e = this;
        $(ele).parent().parent().fadeOut("slow");
        setTimeout(function() {
            $(ele).parent().parent().remove();
        }, 2000);
        clearInterval(e.t, e.timer);
    },
    computed: function(i, ele) {
        var e = this;
        var src = e.config.imgSrc[Math.floor(Math.random() * e.config.imgSrc.length)],
            cw = Math.round(Math.random() * $(window).outerWidth()) * 2 - Math.round(Math.random() * $(window).outerWidth()) * 2,
            f = Math.round(Math.random() * 90) - Math.round(Math.random() * 90),
            ch = Math.round(Math.random() * $(window).outerHeight()),
            heights = Math.round(Math.random() * 50 + 60),
            widths = Math.round(Math.random() * 50 + 26),
            b = Math.floor(Math.random() * e.config.animatefirstTime * 1000),
            c = Math.floor(Math.random() * e.config.animatesecondTime * 1000),
            d = Math.round(Math.random() * 9996)
        var dom = $('<li class="special"><a></a></li>');
        dom.find('a').attr('href', e.config.url).attr('target', '_blank');
        $(ele).append(dom.css({
                top: e.config.top,
                left: e.config.left,
                zIndex: 9990 < d ? d : 9996,
                width: widths,
                height: heights,
                background: 'url(' + src + ')no-repeat center/contain',
                transform: "perspective(300px) rotateX(" + f + "deg)rotateY(" + f + "deg)  rotateZ(" + f + "deg)",
                borderRadius: '4px'
            }).delay(i)
            .animate({
                left: cw / e.config.multiple,
                width: Math.round(Math.random() * 50 + 80),
                height: Math.round(Math.random() * 50 + 150),
                top: e.config.negative == !0 ? $(window).height() : -$(window).height()
            }, b)
            .animate({
                left: cw,
                zIndex: 9999,
                width: Math.round(Math.random() * 50 + 80),
                height: Math.round(Math.random() * 50 + 150),
                top: $(window).height()
            }, c))
    }
}
var redpacket = new Redpacket();
var curUnixTime = Math.round(new Date().getTime() / 1000);
var firstTime = new Date(Date.UTC(2018, 6 - 1, 14, 5, 48, 0));
var secondTime = new Date(Date.UTC(2018, 6 - 1, 14, 5, 51, 0));
var commonfirstTime = Math.round(firstTime.getTime() / 1000);
var commonsecondTime = Math.round(secondTime.getTime() / 1000);
$('.redpacket').fadeIn(2000);
$('.redpacket-close').on('click', function() {
    $('.redpacket').fadeOut(1000);
})
redpacket.init('.redpacket-main', {
    start: 1,
    end: 10,
    monitor: 1,
    output: 10,
    top: "40%",
    left: "25%",
    multiple: 3,
    negative: true,
    animatefirstTime: 15,
    animatesecondTime: 15,
    url: '',
    imgSrc: ['./jd_50.png', './jd_100.png', './jd_200.png', './jd_300.png', './jd_500.png']
});
$('.firework').fadeIn(2000);
$('.firework-close').on('click', function() {
    $('.firework').fadeOut(1000);
});
redpacket.init('.firework-main', {
    start: .5,
    end: 10,
    monitor: 1,
    output: 10,
    top: "40%",
    left: "25%",
    multiple: 10,
    negative: false,
    animatefirstTime: 5,
    animatesecondTime: 15,
    url: '',
    imgSrc: ['./tm_50.png', './tm_100.png', './tm_200.png', './tm_300.png', './tm_500.png']
});