var GameOverScene = function (game) {
    var s = {

    }

    s.draw = function () {
        game.context.fillStyle = 'red';
        game.context.font = "20px Georgia"
        game.context.fillText('游戏结束', 150, 200)
    }

    s.update = function () {

    }

    return s
}