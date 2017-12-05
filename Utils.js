var log = function () {
    console.log.apply(console, arguments);
}

var imageFromPath = function (path) {
    var img = new Image()
    img.src = path;
    return img
}

var hitRect = function (o, d) {
    var px = o.x <= d.x ? d.x : o.x;
    var py = o.y <= d.y ? d.y : o.y;

    if (px >= o.x
        && px <= o.x + o.img.width
        && py >= o.y
        && py <= o.y + o.img.height
        && px >= d.x
        && px <= d.x + d.img.width
        && py >= d.y
        && py <= d.y + d.img.height ) {
        return true;
    } else {
        return false;
    }
}
