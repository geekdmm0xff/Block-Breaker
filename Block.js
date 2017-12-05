var Block = function (e) {
    var img = imageFromPath('Resource/block.png')
    var o = {
        img: img,
        x: e.x,
        y: e.y,
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