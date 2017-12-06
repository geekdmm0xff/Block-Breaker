var Block = function (position) {
    var p = position
    var img = imageFromPath('Resource/block.png')
    log('init life:', p.life)
    var o = {
        img: img,
        x: p.x,
        y: p.y,
        alive: true,
        life:p.life || 1
    }
    o.kill = function () {
        log(o.life)
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