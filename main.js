/**
 * Created by geekduan on 2017/12/7.
 */
var loadLevels = function (level, game) {
    level -= 1
    var list = levels[level]
    var blocks = []
    for (var i = 0; i < list.length; i++) {
        var e = list[i]
        var b = Block(e, game)
        blocks.push(b)
    }
    return blocks
}

var __main = function() {
    // canvas
    var game = Game(30, {
        block: 'Resource/block.png',
        ball: 'Resource/ball.png',
        paddle: 'Resource/paddle.png',
    })

    var paddle = null
    var ball = null

    var blockList = null

    // image 加载完回调
    game.config = function () {
        paddle = Paddle(game)
        ball = Ball(game)
        blockList = loadLevels(1, game)
    }

    // 注册函数和声明函数是两回事!
    game.registerAction('a', function () {
        paddle.moveLeft()
    })

    game.registerAction('d', function () {
        paddle.moveRight()
    })

    game.registerAction('f', function () {
        ball.fired = true
    })

    game.enableDebug = true
    game.debugCallback(function () {
        // 注册系统事件
        window.addEventListener('keydown', function (event) {
            var k = event.key
            if (k === 'p') {
                game.pause ^= 1
            } else if ('123456789'.includes(k)) {
                log(game)
                blockList = loadLevels(Number(k), game)
            }
        })

        // dynamic speed
        var input = e('#id-speed-input')
        var span = e('#id-speed-span')
        input.value = game.fps
        span.innerHTML = game.fps

        input.addEventListener('change', function (event) {
            var v = input.value
            span.innerHTML = v
            game.fps = Number(v)
        })

        // drag ball
        var canvas = game.canvas
        var enableDrag = false
        canvas.addEventListener('mousedown', function (event) {
            var x = event.offsetX
            var y = event.offsetY
            if (ball.tapBall(x, y)) {
                enableDrag = true
            }
        })
        canvas.addEventListener('mousemove', function (event) {
            if (enableDrag) {
                ball.x = event.offsetX
                ball.y = event.offsetY
            }
        })
        canvas.addEventListener('mouseup', function (event) {
            enableDrag = false
        })
    })

    game.update = function () {
        // 暂停检测
        if (game.pause) {
            return
        }

        ball.move()

        // 碰撞检测
        if (paddle.collide(ball)) {
            ball.bounce()
        }

        for (var i = 0; i < blockList.length; i++) {
            var b = blockList[i]
            if (b.collide(ball)) {
                b.kill()
                ball.bounce()
                // update score
                if (!b.alive) {
                    game.score += 100
                }

            }
        }
    }


    game.draw = function () {
        game.drawBackground()

        game.drawImage(paddle)
        game.drawImage(ball)

        for (var i = 0; i < blockList.length; i++) {
            var b = blockList[i]
            if (b.alive) {
                game.drawImage(b)
            }
        }

        game.drawText()
    }
}