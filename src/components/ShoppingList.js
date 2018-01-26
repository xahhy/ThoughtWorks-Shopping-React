import React from 'react';
import {observer} from 'mobx-react';
import {ITEMS} from './Items'
import {action} from "mobx/lib/mobx";

const ShoppingList = observer(class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
        this.items = [];
    }

    render() {
        console.log(this.props.items);
        return (
            <div>
                {this.props.items.map(
                    (item, index) => <ShoppingItem
                        key={item.barcode}
                        item={item}
                        data={this.props.data}
                        ref={(item) => this.items[index] = item}
                    />)}
            </div>
        )
    }
});

const ShoppingItem = observer(class ShoppingItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.getCartNumber = this.getCartNumber.bind(this);
        this.renderCartNumber = this.renderCartNumber.bind(this);
    }

    render() {
        let cartNumber = this.getCartNumber(this.props.item);
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
                                item={this.props.item}
                            />
                        </div>
                        <div className="col-12 col-sm">{this.props.item.unit}</div>
                    </div>
                    <div className="col">
                        <button className="btn btn-warning" onClick={this.handleAddToCart}>
                            加入购物车
                            {this.renderCartNumber(this.props.item)}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    handleAddToCart() {
        this.props.data.addToCart(this.props.item);
    }

    getCartNumber(item) {
        let _item = this.props.data.cartData.items.filter((cartItem, index) => {
            return cartItem.barcode === item.barcode
        });
        if (_item.length === 0) {
            return 0;
        } else {
            return _item[0].count;
        }
    }

    renderCartNumber(item){
        let cartNumber = this.getCartNumber(item);
        if(cartNumber !== 0){
            return <span className="badge badge-success">{cartNumber}</span>
        }
    }
});

const InputNumberComponent = observer(class InputNumberComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleNumberChange = this.handleNumberChange.bind(this);
    }

    render() {
        return (
            <span className="input-group">
                <div className="input-group-prepend">
                    <button className="btn btn-danger" type="button"
                            onClick={this.handleMinusNumber.bind(this)}
                    >－</button>
                </div>
                <input type="number" className="form-control text-center" placeholder="" aria-label=""
                       value={this.props.item.count}
                       onChange={this.handleNumberChange}
                />
                <div className="input-group-append">
                    <button className="btn btn-success" type="button"
                            onClick={this.handlePlusNumber.bind(this)}
                    >＋</button>
                </div>
            </span>
        )
    }

    handleNumberChange(event) {
        event.target.value = event.target.value < 0 ? 0 : event.target.value;
        this.props.item.count = event.target.value;
    }

    handleMinusNumber(event) {
        this.props.item.count > 0 ? this.props.item.count-- : 0;
    }

    handlePlusNumber(event) {
        this.props.item.count++;
    }
});

export {InputNumberComponent};
export default ShoppingList;