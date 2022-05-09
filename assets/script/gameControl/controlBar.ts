
import { _decorator, Component, Node, game, find, director, log, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = controlBar
 * DateTime = Mon May 09 2022 15:44:27 GMT+0800 (中国标准时间)
 * Author = chensha
 * FileBasename = controlBar.ts
 * FileBasenameNoExtension = controlBar
 * URL = db://assets/script/gameControl/controlBar.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('controlBar')
export class controlBar extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start() {

        //设置顶层节点
        game.addPersistRootNode(this.node);
        director.loadScene("PackingPests");

        //添加游戏需要的按键、触控监听
        this.node.on(Node.EventType.TOUCH_START, this.touchStartInput,this);
        this.node.on(Node.EventType.TOUCH_END, this.touchEndInput,this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.touchEndInput,this);
    }

    touchStartInput(e: EventTouch) {
        log("点击id：" + e.getID());
    }

    touchEndInput(e: EventTouch) {
        log("结束id：" + e.getID());
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
