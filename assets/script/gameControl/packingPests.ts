
import { _decorator, Component, Node, Animation } from 'cc';
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
export class packingPests extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(Node)
    handsNode :Node= null;

    handsAnim :Animation= null;

    start () {
        // [3]
        this.handsAnim=this.handsNode.getComponent(Animation);
        console.log(this.handsAnim);

        this.node.on('systemClickLeft',this.systemClickLeft,this);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    systemClickLeft(){
        console.log("clickLeft");
        this.handsAnim.play('handsAccept');
    }
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
