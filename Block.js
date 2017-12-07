var Block = function (position, game) {
    var p = position
    var o = game.imageByName('block')
    log('load block:', o)
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
    return o;
}