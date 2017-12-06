var Block = function (position) {
    var p = position
    var img = imageFromPath('Resource/block.png')
    var o = {
        img: img,
        x: p.x,
        y: p.y,
        alive: true
    }
    o.kill = function () {
        o.alive = false
    }

    o.collide = function (obj) {
        return hitRect(o, obj) && o.alive
    }
    return o;
}