import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import { observer, action, autorun } from 'mobx-react'

import './index.css';
import ShoppingList from './components/ShoppingList'
import Header from './components/Header'
import ShoppingFooter from './components/ShoppingFooter.js'
import ShoppingCart from './components/ShoppingCart.js'
import {ITEMS} from './components/Items'
import MobxStore from "./components/MobxStore";



const Home = observer(class Home extends React.Component {
    constructor(props){
        super(props);
        this.data = new MobxStore();
    }
    componentWillMount(){
        let _items = ITEMS.slice();
        _items.map((item, index) => {
            item = Object.assign(item, {count:0})
        });
        this.data.replace({items:ITEMS});
    }
    render() {
        return (
            <div>
                <Header title="商店没钱"/>
                <div className="container">
                    <ShoppingList
                        data = {this.data}
                        items={ this.data.itemData.items }
                        // ref={(list) => this.shoppingList = list}
                    />
                    <ShoppingFooter clickBuyButton={this.handleClickBuyButton}/>
                    {/*<ShoppingCart cart={this.state.cart}/>*/}
                </div>
            </div>
        )
    }

});

ReactDOM.render(
    <Home/>,
    document.getElementById('root')
);
