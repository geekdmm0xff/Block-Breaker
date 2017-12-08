var Scene = function (game) {
    var s = {
        game: game,
    }

    var paddle = Paddle(game)
    var ball = Ball(game)
    var blockList = loadLevels(1, game)

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

    game.debugCallback(function () {
        // 注册系统事件
        window.addEventListener('keydown', function (event) {
            var k = event.key
            if (k === 'p') {
                game.pause ^= 1
            } else if ('123456789'.includes(k)) {
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

    s.draw = function () {
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

    s.update = function () {
        // 暂停检测
        if (game.pause) {
            return
        }

        ball.move()

        // 碰撞检测
        if (paddle.collide(ball)) {
            ball.bounce()
        }

        // 是否 paddle
        if (ball.isOver(paddle)) {
            var scene = GameOverScene(game)
            game.replaceScene(scene)
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

    return s
}