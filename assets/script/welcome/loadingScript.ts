
import { _decorator, Component, Node, resources, Texture2D, director } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = loadingScript
 * DateTime = Sun Jun 05 2022 11:21:14 GMT+0800 (中国标准时间)
 * Author = chensha
 * FileBasename = loadingScript.ts
 * FileBasenameNoExtension = loadingScript
 * URL = db://assets/script/welcome/loadingScript.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('loadingScript')
export class loadingScript extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start() {
        //预加载
        resources.preloadDir('texture',Texture2D,(err, textures) => {console.log(textures)});

        let sceneList = ['PackingPests'];
        this.preloadScene(sceneList, 0);

        this.node.on(Node.EventType.TOUCH_START,this.loadClick,this);
    }

    preloadScene(sceneList, count) {
        if (count > sceneList.length) {
            this.loadComplete();
            return;
        }

        resources.preloadScene(sceneList[count], (finished: number, total: number, item) => {
            console.log(finished);
        }, (err) => {
            this.preloadScene(sceneList, count + 1);
        });

    }

    loadComplete() {
        //加载完成
        //引入controlBar
        //director.loadScene('gameControlBar');
    }

    loadClick(){
        director.loadScene('gameControlBar');
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
