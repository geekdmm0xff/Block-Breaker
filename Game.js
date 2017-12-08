var Game = function (fps, paths, loadedCallbck) {
    var g = {
        keydowns: {}, // 按键状态 —— 封装标记
        actions: {},  // 事件回调
        images: {},
        fps: 60,
        score: 0,
        pause: false,
        enableDebug: true,
        scene: null,
    }

    var canvas = e('#id-canvas')
    var ctx = canvas.getContext('2d')

    g.canvas = canvas
    g.context = ctx

    g.debugCallback = function (callback) {
        log('debug 0')
        if (!g.enableDebug) {
            return
        }
        log('debug 1')
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

    function loadImages(){
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
                    log('load image', g.images)
                    g.run()
                }
            }
        }
    }
    loadImages()

    g.runWithScene = function (scene) {
        g.scene = scene
        setTimeout(runloop, 1000/g.fps)
    }

    g.run = function () {
        loadedCallbck()
    }

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
        //
        g.scene.update()
        // clear before
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw
        g.scene.draw()

        setTimeout(runloop, 1000/g.fps)
    }

    return g
}