
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
    //投掷物种类，false为fish，true为wine
    private goodsType: boolean = false;

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
        this.handsAnim.play('handsRefuse');
        if (this.waitForInput != null) {
            //存在等待按键
            clearTimeout(this.waitForInput);
            this.waitForInput = null;
            if (this.goodsType) {
                this.goodsAnim.play("wineRefuse");
            } else {
                this.goodsAnim.play("fishRefuse");
            }
        }
    }

    systemClickDouble() {
        this.handsAnim.play('handsAccept');
        if (this.waitForInput != null) {
            //存在等待按键
            clearTimeout(this.waitForInput);
            this.waitForInput = null;
            if (this.goodsType) {
                this.goodsAnim.play("wineAccept");
            } else {
                this.goodsAnim.play("fishAccept");
            }
        }
    }

    sysEmit(type: number, inf?: number) {
        console.log('begin');
        switch (type) {
            case 0:
                this.handsAnim.play("handsBegin");
                break;
            case 1:
                this.goodsType = false;
                this.goodsAnim.stop();
                this.goodsAnim.play("fishDefault");
                setTimeout(() => { this.judiceInput() }, inf);
                break;
            case 2:
                this.goodsType = true;
                this.goodsAnim.stop();
                this.goodsAnim.play("wineDefault");
                setTimeout(() => { this.judiceInput() }, inf);
                break;
        }
    }

    judiceInput() {
        this.waitForInput = setTimeout(() => {
            if (this.goodsType) {
                this.goodsAnim.play("wineMiss");
            } else {
                this.goodsAnim.play("fishMiss");
            }
            console.log("miss");
            this.waitForInput = null;
        }, 100);
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
