class Game {
    static instance(...args) {
        this.game = this.game || new this(...args)
        return this.game
    }

    constructor(fps, paths, loadCallback) {
        this.fps = fps || 60
        this.paths = paths
        this.loadCallback = loadCallback

        this.keydowns = {} // 按键状态 —— 封装标记
        this.actions = {}  // 事件回调
        this.images = {}
        this.scene = null

        this.score = 0
        this.pause = false
        this.enableDebug = true

        this.canvas = e('#id-canvas')
        this.context = this.canvas.getContext('2d')

        this.init()

        // keyboard
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', event => {
            this.keydowns[event.key] = false
        })
    }

    init() {
        var loads = 0
        var names = Object.keys(this.paths)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            let path = this.paths[name]
            let img = new Image()

            img.src = path
            img.onload = () => {
                loads++
                this.images[name] = img
                if (loads == names.length) {
                    this.run()
                }
            }
        }
    }

    //
    debugCallback(callback) {
        if (!this.enableDebug) {
            return
        }
        callback()
    }

    replaceScene(scene) {
        this.scene = scene
    }

    imageByName(name) {
        var image = this.images[name]
        var o = {
            image: image,
            w: image.width,
            h: image.height,
        }
        return o
    }

    // event
    registerAction(key, callback) {
        this.actions[key] = callback
    }


    // draw
    drawBackground() {
        this.context.fillStyle = '#565';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    drawImage(obj) {
        this.context.drawImage(obj.image, obj.x, obj.y)
    }

    drawText() {
        this.context.fillStyle = '#fff';
        this.context.font = "15px Georgia"
        this.context.fillText('分数:'+this.score, 10, 390)
    }

    runWithScene(scene) {
        this.scene = scene
        setTimeout(() => {
            this.runloop()
        }, 1000/this.fps)
    }

    run() {
        this.loadCallback()
    }

    runloop() {
        var actions = Object.keys(this.keydowns) // 获取所有的 key:
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            var callback = this.actions[key]
            if (this.keydowns[key] && typeof callback == "function" ) { // tap -> run
                callback()
            }
        }
        //
        this.scene.update()
        // clear before
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // draw
        this.scene.draw()

        setTimeout(() => {
            this.runloop()
        }, 1000/this.fps)
    }
}