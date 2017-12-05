var Paddle = function () {
    var img = imageFromPath('Resource/paddle.png')
    var o = {
        img: img,
        x: 200,
        y: 300,
        speed: 10,
    }

    o.move = function (d) {
        if (d < 0) {
            o.x = 0
            return
        }
        if (d > 400 - o.img.width) {
            o.x = 400 - o.img.width
            return
        }
        o.x = d
    }
    o.moveLeft = function () {
        o.move(o.x - o.speed)
    }
    o.moveRight = function () {
        o.move(o.x + o.speed)
    }

    o.collide = function (d) {
        return hitRect(o, d)
    }
    return o;
}