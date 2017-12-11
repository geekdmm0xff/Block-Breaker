class EditScene extends BaseScene {
    constructor(game) {
        super(game)
        // event
        game.registerAction('q', function () {
            var s = new SceneBegin(game)
            game.replaceScene(s)
        })

        game.registerAction('s', function () {
            log('save levels!1')
        })
    }

    draw() {
        var ctx = this.game.context
        var canvas = this.game.canvas

        ctx.fillStyle = '#565';
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = 'white';
        ctx.font = "10px Georgia"
        ctx.fillText('编辑完成按 s 保存, 按 q 取消并退出', 20, 390)
    }

    update() {

    }
}