! function () {
    var view = document.querySelector('nav.menu')
    var controller = {
        view: null,
        aTags: null,
        init: function (view) {
            this.view = view
            this.initAnimation()
            this.bindEvents()
        },
        initAnimation: function () {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
        },
        scrollToElement: function (element) {
            let top = element.offsetTop
            let currentTop = window.scrollY //窗口当前距顶部距离
            let targetTop = top - 90 //要到达的位置				
            var coords = {
                y: currentTop
            }; //起始位置
            var tween = new TWEEN.Tween(coords) //指定起始位置
                .to({
                    y: targetTop
                }, 1000) //结束位置和时间
                .easing(TWEEN.Easing.Quartic.InOut) //缓动类型 在源文件中查找
                .onUpdate(function () {
                    window.scrollTo(0, coords.y)
                })
                .start();
        },
        bindEvents: function () {
            let aTags = this.view.querySelectorAll('nav.menu>ul>li>a')
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick = (x) => {
                    x.preventDefault()
                    let a = x.currentTarget
                    let href = a.getAttribute('href')
                    let element = document.querySelector(href)
                    this.scrollToElement(element)
                }
            }
        }
    }
    controller.init(view)
}.call()