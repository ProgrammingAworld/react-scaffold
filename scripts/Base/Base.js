/**
 * Created by anchao on 2015/12/7.
 */
class Base{
    constructor(){
    }

    init(){
        let that =this;
        this.dataLoad(oData=>{
            if(oData){
                that.render(oData);
            }
        });
    }

    render(oData){
        //渲染页面


        //事件绑定
        this.event();
    }

    event(){

    }
    dataLoad(){

    }
}