var Paddle = function (game) {
    var o = game.imageByName('paddle')
    o.x = 200
    o.y = 300
    o.speed = 10
    o.move = function (d) {
        if (d < 0) {
            o.x = 0
            return
        }
        if (d > 400 - o.w) {
            o.x = 400 - o.w
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