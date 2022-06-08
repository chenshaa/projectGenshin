import packingPests from './packingPests';
import { _decorator, Component, Node, game, director, EventTouch, EventKeyboard, input, Input, Script, Scene, AudioSource, loader, assetManager, JsonAsset } from 'cc';
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

    @property(Node)
    private leftTouchPanel: Node = null;

    @property(Node)
    private rightTouchPanel: Node = null;

    @property
    private inputDely: number = 50;

    //输入类型，0为无输入。1为A，2为B，3为AB
    private inputType: number = 0;

    //系统计时器
    public systemTime: number = 0;

    //存放内存中铺面
    private packingPestsMap: object = null;

    //全局设置
    private systemSetting: object = null;
    start() {
        //设置顶层节点
        game.addPersistRootNode(this.node);

        //添加游戏需要的按键、触控监听
        //左控制面板
        this.leftTouchPanel.on(Node.EventType.TOUCH_START, this.leftTouchPanelStart, this);
        this.leftTouchPanel.on(Node.EventType.TOUCH_END, this.leftTouchPanelEnd, this);
        this.leftTouchPanel.on(Node.EventType.TOUCH_CANCEL, this.leftTouchPanelEnd, this);
        //右控制面板
        this.rightTouchPanel.on(Node.EventType.TOUCH_START, this.rightTouchPanelStart, this);
        this.rightTouchPanel.on(Node.EventType.TOUCH_END, this.rightTouchPanelEnd, this);
        this.rightTouchPanel.on(Node.EventType.TOUCH_CANCEL, this.rightTouchPanelEnd, this);
        //按键
        input.on(Input.EventType.KEY_DOWN, this.keyInputStart, this);
        input.on(Input.EventType.KEY_UP, this.keyInputEnd, this);

        //铺面读入内存
        let mapList = [{ uuid: '67HNmUYn1K7LbqhgAd9KqA' },
        { uuid: 'e5EcJk3TRHBoBzo8X0PO2q' }];

        assetManager.loadAny(mapList, (err, assets) => {
            this.systemSetting = assets[0].json;
            this.packingPestsMap = assets[1].json;

            //开始游戏
            this.gamrDirector();
        });

    }

    gamrDirector() {
        //开始播放
        this.node.getComponent(AudioSource).play();

        //场景1：packingPests
        director.loadScene("packingPests");

        //@ts-ignore
        let localOffset = this.packingPestsMap.localOffset;
        //@ts-ignore
        for (let data of this.packingPestsMap.data) {
            setTimeout(() => {
                packingPests.ins.sysEmit(data.type, 100);
                //@ts-ignore
            }, data.time - localOffset + this.systemSetting.inputDelay);
        }

    }

    leftTouchPanelStart(e: EventTouch) {
        if (this.inputType == 0) {
            this.inputType = 1;
            setTimeout(() => {
                if (this.inputType == 1) {
                    //没有伴随按键
                    this.inputType = 0;
                    this.inputLeft();
                }
            }, this.inputDely);

        } else if (this.inputType == 2) {
            //存在right伴随
            this.inputType = 3;
            this.inputDoubleStart();
        }
    }

    leftTouchPanelEnd(e: EventTouch) {
        this.keyInputEnd();
    }

    rightTouchPanelStart(e: EventTouch) {
        if (this.inputType == 0) {
            this.inputType = 2;
            setTimeout(() => {
                if (this.inputType == 2) {
                    //没有伴随按键
                    this.inputType = 0;
                    this.inputRight();
                }
            }, this.inputDely);

        } else if (this.inputType == 1) {
            //存在left伴随
            this.inputType = 3;
            this.inputDoubleStart();
        }
    }

    rightTouchPanelEnd(e: EventTouch) {
        this.keyInputEnd();
    }

    keyInputStart(e: EventKeyboard) {
        switch (e.keyCode) {
            case 37:
                //左方向
                if (this.inputType == 0) {
                    this.inputType = 1;
                    setTimeout(() => {
                        if (this.inputType == 1) {
                            //没有伴随按键
                            this.inputType = 0;
                            this.inputLeft();
                        }
                    }, this.inputDely);

                } else if (this.inputType == 2) {
                    //存在right伴随
                    this.inputType = 3;
                    this.inputDoubleStart();
                }
                break;
            case 39:
                //右方向
                if (this.inputType == 0) {
                    this.inputType = 2;
                    setTimeout(() => {
                        if (this.inputType == 2) {
                            //没有伴随按键
                            this.inputType = 0;
                            this.inputRight();
                        }
                    }, this.inputDely);

                } else if (this.inputType == 1) {
                    //存在left伴随
                    this.inputType = 3;
                    this.inputDoubleStart();
                }
                break;
        }
    }

    keyInputEnd(e?: EventKeyboard) {
        if (this.inputType == 3) {
            this.inputType = 0;
            this.inputDoubleEnd();
        }
    }

    inputLeft() {
        packingPests.ins.systemClickLeft();
    }

    inputRight() {
        //console.log("righr");
    }

    inputDoubleStart() {
        //console.log("double");
        packingPests.ins.systemClickDouble();
    }

    inputDoubleEnd() {
        //console.log("doubleEnd");
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
