var Ball = function () {
    var img = imageFromPath('Resource/ball.png')
    var o = {
        img: img,
        x: 150,
        y: 200,
        speedX: 10,
        speedY: 10,
        fired: false
    }

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