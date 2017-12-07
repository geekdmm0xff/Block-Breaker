var Game = function (fps, paths) {
    var g = {}

    var canvas = document.querySelector('#id-canvas')
    var ctx = canvas.getContext('2d')

    g.canvas = canvas
    g.context = ctx

    //
    g.fps = 60

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
    g.drawImage = function (obj) {
        g.context.drawImage(obj.img, obj.x, obj.y)
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

    g.imgMap = {}
    // load image
    var loadImages = function (callback) {
        var loads = 0
        var keys = Object.keys(paths)
        for (let i = 0; i < keys.length; i++) {
            let k = keys[i]
            let path = paths[k]
            let img = new Image()

            img.src = path;
            img.onload = function () {
                loads++
                g.imgMap[k] = {
                    image: img,
                    w: img.width,
                    h: img.height,
                    name: k,
                }
                if (loads == keys.length) {
                    callback()
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