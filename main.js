/**
 * Created by geekduan on 2017/12/7.
 */
var loadLevels = function (level, game) {
    level -= 1
    var list = levels[level]
    if (level > list.length) {
        log('level not find!')
        return
    }
    var blocks = []
    for (var i = 0; i < list.length; i++) {
        var e = list[i]
        var b = Block(e, game)
        blocks.push(b)
    }
    return blocks
}

var __main = function() {
    // canvas
    var paths = {
        block: 'Resource/block.png',
        ball: 'Resource/ball.png',
        paddle: 'Resource/paddle.png',
    }

    var game = Game(30, paths, function () { // image 加载完回调
        var scene = Scene(game)
        game.runWithScene(scene)
    })

}