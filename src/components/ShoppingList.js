import React from 'react';
import {observer} from 'mobx-react';
import {ITEMS} from './Items'

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
                        ref={(item) => this.items[index] = item}
                        handleAddToCart={this.handleAddToCart}
                    />)}
            </div>
        )
    }
});

const ShoppingItem = observer(class ShoppingItem extends React.Component {
    constructor(props) {
        super(props);
    }

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
                                item={this.props.item}
                            />
                        </div>
                        <div className="col-12 col-sm">{this.props.item.unit}</div>
                    </div>
                    <div className="col">
                        <button className="btn btn-warning" onClick={this.handleAddToCart}>加入购物车</button>
                    </div>
                </div>
            </div>
        )
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