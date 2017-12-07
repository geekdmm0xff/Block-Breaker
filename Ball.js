var Ball = function (game) {
    var o = game.imageByName('ball')
    o.x = 150
    o.y = 200
    o.speedX = 10
    o.speedY = 10
    o.fired = false

    o.move = function () {
        if (o.fired) { // move! 速度控制坐标走向
            if (o.x < 0 || o.x > 400) {
                o.speedX *= -1
            }
            if (o.y < 0 || o.y > 400) {
                o.speedY *= -1
            }
            o.x += o.speedX
            o.y += o.speedY
            //log(`[${o.x}, ${o.y}]`)
        }
    }
    o.bounce = function () { // 反弹
        o.speedY *= -1;
    }

    return o;
}