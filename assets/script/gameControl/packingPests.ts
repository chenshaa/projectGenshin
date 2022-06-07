
import { _decorator, Component, Node, Animation, director } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = packingPests
 * DateTime = Sun Jun 05 2022 20:08:17 GMT+0800 (中国标准时间)
 * Author = chensha
 * FileBasename = packingPests.ts
 * FileBasenameNoExtension = packingPests
 * URL = db://assets/script/gameControl/packingPests.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('packingPests')
export default class packingPests extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property(Node)
    handsNode: Node = null;

    @property(Node)
    goodsNode: Node = null;

    private handsAnim: Animation = null;
    private goodsAnim: Animation = null;

    static _instance: packingPests;

    private waitForInput: number = null;

    start() {
        // [3]
        packingPests._instance = this;

        this.handsAnim = this.handsNode.getComponent(Animation);
        this.goodsAnim = this.goodsNode.getComponent(Animation);
    }

    /**
     * 当前脚本运行实例
     * @returns {packingPests}
     */
    static get ins() {
        return packingPests._instance
    }

    systemClickLeft() {
        //console.log(this.handsAnim);
        this.handsAnim.play('handsAccept');
        if (this.waitForInput != null) {
            //存在等待按键
            console.log("clicked");
            clearTimeout(this.waitForInput);
            this.waitForInput = null;
            this.goodsAnim.play("fishAccept");
        }
    }

    sysEmit(type: number, inf?: number) {
        switch (type) {
            case 1:
                this.goodsAnim.play("fishDefault");
                setTimeout(() => { this.judiceInput() }, inf);
                break;
        }
    }

    judiceInput() {
        this.waitForInput = setTimeout(() => {
            this.goodsAnim.play("fishMiss");
            console.log("miss");
            this.waitForInput = null;
        }, 200);
    }




    // update (deltaTime: number) {
    //     // [4]
    // }

}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
