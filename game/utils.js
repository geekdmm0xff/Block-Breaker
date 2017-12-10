var log = function () {
    console.log.apply(console, arguments)
}

var e = sel => document.querySelector(sel)

var hitRect = function (o, d) {
    var px = o.x <= d.x ? d.x : o.x
    var py = o.y <= d.y ? d.y : o.y

    if (px >= o.x
        && px <= o.x + o.w
        && py >= o.y
        && py <= o.y + o.h
        && px >= d.x
        && px <= d.x + d.w
        && py >= d.y
        && py <= d.y + d.h ) {
        return true;
    } else {
        return false;
    }
}
