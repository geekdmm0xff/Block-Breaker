var Block = function (position, game) {
    log('game:', game)

    var p = position
    var o = game.imageByName('block')

    o.x = p.x
    o.y = p.y
    o.alive = true
    o.life = p.life || 1

    o.kill = function () {
        o.life--
        if (o.life == 0) {
            o.alive = false
        }
    }

    o.collide = function (obj) {
        return hitRect(o, obj) && o.alive
    }

    o.tapBlock = function (x, y) {
        var xIN = x > o.x && x < o.x + o.w
        var yIN = y > o.x && y < o.y + o.h
        return xIN && yIN
    }
    return o;
}