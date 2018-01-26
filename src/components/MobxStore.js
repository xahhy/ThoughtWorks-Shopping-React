import {observable, computed, autorun} from 'mobx-react';
import {extendObservable, action} from 'mobx'

export default class MobxStore {
    constructor() {
        extendObservable(this, {
            itemData: {},
            cartData: {items:[]},

        })
    }

    //设置数据
    replace = (data) => {
        this.itemData = data;
    };

    /**
     * 如果购物车里已有该物品newItem，则在购物车里再增加newItem.count个。否则向购物车添加该物品newItem
     * 然后将商品数量置为1
     * @param newItem
     */
    addToCart(newItem){
        if(newItem.count <= 0)return;
        let item = this.cartData.items.filter((item, index) => {return item.barcode === newItem.barcode});
        if(item.length !== 0){
            item[0].count += newItem.count;
        }else{
            this.cartData.items.push({...newItem});
        }
        newItem.count = 1;
    }

    deleteCartItem(delItem){
        this.cartData.items.remove(delItem)
    }


    //按下的反选
    itemPress = () => {
        let i = 0;
        this.itemData.datas.map((item) => {
            if (item.isSelect !== true) {
                i += 1;
            }
        });
        this.itemData.isAllSelect = i === 0;
    };

    //加
    increase = (money) => {
        this.itemData.totalMoney += money;
    };

    //减
    reduce = (money) => {
        this.itemData.totalMoney -= money;
    };

    //全选
    selectAll = () => {
        this.itemData.isAllSelect = !this.itemData.isAllSelect;
        this.itemData.totalMoney = 0;
        if (this.itemData.isAllSelect) {
            for (let i = 0;
                 i < this.itemData.datas.length;
                 i++) {
                this.itemData.totalMoney += this.itemData.datas[i].money * this.itemData.datas[i].count;
            }
        }
    }
}

