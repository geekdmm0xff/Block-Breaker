var Game = function (fps, paths) {
    var g = {}

    var canvas = e('#id-canvas')
    var ctx = canvas.getContext('2d')

    g.canvas = canvas
    g.context = ctx
    g.images = {}

    //
    g.fps = 60
    g.score = 0

    //
    g.pause = false

    //
    g.enableDebug = false
    g.debugCallback = function (callback) {
        if (!g.enableDebug) {
            return
        }
        callback()
    }

    // draw
    g.drawBackground = function () {
        g.context.fillStyle = '#565';
        g.context.fillRect(0, 0, g.canvas.width, g.canvas.height)
    }

    g.drawImage = function (obj) {
        g.context.drawImage(obj.image, obj.x, obj.y)
    }

    g.drawText = function () {
        g.context.fillStyle = '#fff';
        g.context.font = "15px Georgia"
        g.context.fillText('分数:'+g.score, 10, 390)
    }

    // 封装点击事件
    g.keydowns = {} // 按键状态 —— 封装标记
    g.actions = {}  // 事件回调

    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }

    // keyboard event
    window.addEventListener('keydown', function (event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function (event) {
        g.keydowns[event.key] = false
    })

    // load image
    g.imageByName = function (name) {
        var image = g.images[name]
        var o = {
            image: image,
            w: image.width,
            h: image.height,
        }
        return o
    }

    var loadImages = function (callback) {
        var loads = 0
        var names = Object.keys(paths)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            let path = paths[name]
            let img = new Image()

            img.src = path
            img.onload = function () {
                loads++
                g.images[name] = img
                if (loads == names.length) {
                    callback()
                    // run?
                }
            }
        }
    }
    
    loadImages(function () {
        g.config()
        setTimeout(runloop, 1000/g.fps)
    })


    // runloop
    var runloop = function () {
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

        setTimeout(runloop, 1000/g.fps)
    }

    return g
}