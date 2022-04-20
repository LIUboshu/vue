import { requestTabControl } from "network/request2.js";

export function getDetail (iid){
    return requestTabControl({
        url:'/detail',
        params:{
            iid
        }
    })
}
// 获取推荐数据
export function getRecommend(){
    return requestTabControl({
        url:'/recommend'
    })
}
/* 
    数据来自四面大方
    对数据进行汇总到一个对象当中
    一个对象传入到子组件中
*/
// 商品信息合并
export class Goods{
    constructor(columns,itemInfo,services){
        this.columns = columns;
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.realPrice = itemInfo.lowNowPrice;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice;
    }
}

// 店铺信息
export class Shop{
    constructor(shopInof){
        this.logo = shopInof.shopLogo;
        this.name = shopInof.name;
        this.fans = shopInof.cFans;
        this.sells = shopInof.cSells;
        this.score = shopInof.score;
        this.goodsCount = shopInof.cGoods;
    }
}
// 商品参数信息
export class goodsParam{
    constructor(info,rule){
        // images 某些商品有值,有的商品没有值
        this.image = info.images ? info.images[0] : '';
        this.info = info.set;
        this.rule = rule.tables;
    }
}