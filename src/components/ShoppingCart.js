import React from 'react';
import {InputNumberComponent} from './ShoppingList';

export default class ShoppingCart extends React.Component {
    constructor(props){
        super(props);
        this.items = []
    }
    render() {
        return (
            <div>
                {this.props.cart && this.props.cart.map(
                    (item, index) => <ShoppingCartItem
                        key={item.barcode}
                        item={item}
                        ref={(item) => this.items[index] = item}
                        handleDeleteItem={this.handleDeleteItem}
                    />)}
            </div>
        )
    }
    getAllItems() {
        let result = [];
        this.items.forEach((item, index) => {
            result.push(item.getItemInfo())
        });
        console.log(result);
        return result;
    }
}

class ShoppingCartItem extends React.Component {
    render() {
        return (
            <div className="card shopping-item">
                <div className="card-header">{this.props.item.name}</div>
                <div className="card-body row align-items-center">
                    <div className="col-12 col-sm">单价:{this.props.item.price} ¥</div>
                    <div className="col-12 col-sm-8 row align-items-center align-content-center justify-content-center">
                        <div className="col">数量:</div>
                        <div className="col-7">
                            <InputNumberComponent
                                ref={(input) => this.inputValueComponent = input}
                            />
                        </div>
                        <div className="col-12 col-sm">{this.props.item.unit}</div>
                    </div>
                    <div className="col">
                        <button className="btn btn-danger" onClick={this.props.handleDeleteItem}>删除</button>
                    </div>
                </div>
            </div>
        )
    }
    getItemInfo() {
        let {barcode, name, unit, price} = this.props.item;
        return Object.assign({barcode, name, unit, price}, {cnt: this.inputValueComponent.getInputValue()});
    }
}