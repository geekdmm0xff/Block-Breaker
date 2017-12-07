var Block = function (position, game) {
    var p = position
    var img = game.imgMap['block']
    log('load block:', img)
    var o = {
        img: img.image,
        x: p.x,
        y: p.y,
        w:img.w,
        h:img.h,
        alive: true,
        life:p.life || 1
    }
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