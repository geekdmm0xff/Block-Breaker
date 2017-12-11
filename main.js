/**
 * Created by geekduan on 2017/12/7.
 */
var loadLevels = function (level, game) {
    level -= 1
    var list = levels[level]
    var blocks = []
    for (var i = 0; i < list.length; i++) {
        var e = list[i]
        var b = Block(e, game)
        blocks.push(b)
    }
    return blocks
}

var __main = function() {
    var paths = {
        block: 'img/block.png',
        ball: 'img/ball.png',
        paddle: 'img/paddle.png',
    }

    var game = Game.instance(30, paths, function () { // image 加载完回调
        var scene = new SceneBegin(game)
        game.runWithScene(scene)
    })

}