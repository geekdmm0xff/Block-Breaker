var Game = function (fps) {
    var g = {}

    var canvas = document.querySelector('#id-canvas')
    var ctx = canvas.getContext('2d')

    g.canvas = canvas
    g.context = ctx

    //
    g.pause = false

    // draw
    g.drawImage = function (obj) {
        g.context.drawImage(obj.img, obj.x, obj.y)
    }

    // 封装点击事件
    g.keydowns = {} // 按键状态 —— 封装标记
    g.actions = {}  // 事件回调

    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }

    // 2.keyboard event
    window.addEventListener('keydown', function (event) {
        g.keydowns[event.key] = true
    })

    window.addEventListener('keyup', function (event) {
        g.keydowns[event.key] = false
    })

    // 3.loop
    setInterval(function () {
        // update events
        var actions = Object.keys(g.keydowns) // 获取所有的 key:
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            var callback = g.actions[key]
            if (g.keydowns[key] && typeof callback == "function" ) { // tap -> run
                callback()
            }
        }
        g.update()
        // clear before
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw
        g.draw()
    }, 1000/fps)

    return g
}