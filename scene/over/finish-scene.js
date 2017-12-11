class GameOverScene extends BaseScene {
    constructor(game) {
        super(game)
        // event
        game.registerAction('k', function () {
            var s = new SceneBegin(game)
            game.replaceScene(s)
        })
    }
    draw() {
        this.game.context.fillStyle = 'red';
        this.game.context.font = "20px Georgia"
        this.game.context.fillText('按 k 重新开始游戏', 110, 200)
    }
}