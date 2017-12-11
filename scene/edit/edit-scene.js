const kIdentifer = 'levels'

class EditScene extends BaseScene {
    constructor(game) {
        super(game)

        this.blocks = []
        this.curBlock = null
        this.hasBlock = false

        // event
        game.registerAction('q', function () {
            var s = new SceneBegin(game)
            game.replaceScene(s)
        })

        game.registerAction('s', () => {
            this.saveBlocks()
            var s = new Scene(game, this.blocks)
            game.replaceScene(s)
        })

        game.canvas.addEventListener('mousedown', event => {
            var x = event.offsetX
            var y = event.offsetY

            // 是否有砖块
            for (var i = 0; i < this.blocks.length; i++) {
                let b = this.blocks[i]
                // log(`block:[${b.x},${b.y}] w:${b.w} h:${b.h}`)
                // log(`offset:[${x},${y}]`)

                if (b.tapBlock(x + 5, y + 5) &&
                    b.tapBlock(x - 5, y - 5) &&
                    b.tapBlock(x, y)    ) {
                    this.curBlock = b
                    this.hasBlock = true
                }
            }

            //  没有才创建
            if (!this.hasBlock) {
                var p = {
                    x: x,
                    y: y,
                }
                let b = Block(p, this.game)
                this.blocks.push(b)
            }
        })

        game.canvas.addEventListener('mousemove', event => {
            if (this.hasBlock) {
                this.curBlock.x = event.offsetX
                this.curBlock.y = event.offsetY
            }
        })

        game.canvas.addEventListener('mouseup', event => {
            this.hasBlock = false
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

        for (var i = 0; i < this.blocks.length; i++) {
            var b = this.blocks[i]
            this.game.drawImage(b)
        }
    }

    saveBlocks() {
        var storage = window.localStorage
        var list = []
        for (var i = 0; i < this.blocks.length; i++) {
            var b = this.blocks[i]
            list.push(b)
        }
        var str = JSON.stringify(list)
        storage.setItem(kIdentifer, str)
    }

    loadBlocks() {
        var storage = window.localStorage
        var str = storage.getItem(kIdentifer)
        var list = JSON.parse(str)

        if (!list || list == undefined) {
            list = []
        }
        return list
    }
}