class SceneBegin extends BaseScene {
    constructor(game) {
        super(game)
        // event
        game.registerAction('r', function () {
            var s = new Scene(game)
            game.replaceScene(s)
        })

        game.registerAction('v', function () {
            var s = new EditScene(game)
            game.replaceScene(s)
        })
    }
    draw() {
        this.game.context.fillStyle = 'red';
        this.game.context.font = "20px Georgia"
        this.game.context.fillText('按 r 开始游戏, 按 v 关卡编辑', 70, 200)
    }
}