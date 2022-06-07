
import { _decorator, Component, Node, resources, Texture2D, director, Label, ProgressBar } from 'cc';
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

    @property(Label)
    textLabel: Label = null;

    @property(ProgressBar)
    progressBar: ProgressBar = null;

    start() {
        //预加载资源
        resources.preloadDir('', (finished: number, total: number, item) => {
            this.progressBar.progress = finished / total;
            //console.log(item.info);
            // @ts-ignore
            this.textLabel.string = "正在加载：" + item.info.path;
        }, (err, item) => { this.preloadSceneBegin() });
    }

    preloadSceneBegin() {
        //预加载场景
        let sceneList = ['gameControlBar', 'PackingPests'];
        this.preloadScene(sceneList, 0);
    }

    preloadScene(sceneList, count) {
        if (count >= sceneList.length) {
            this.loadComplete();
            return;
        }
        this.progressBar.progress = sceneList.length / count;
        this.textLabel.string = "正在加载：scene/" + sceneList[count];

        resources.preloadScene(sceneList[count], (finished: number, total: number, item) => {
            console.log(finished);
        }, (err) => {
            this.preloadScene(sceneList, count + 1);
        });
    }

    loadComplete() {
        //加载完成
        //开始监听点击事件
        this.node.on(Node.EventType.TOUCH_START, this.loadClick, this);
        this.textLabel.string = "点击进入游戏";
    }

    loadClick() {
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
