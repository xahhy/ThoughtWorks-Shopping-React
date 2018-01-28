import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import {observer, action, autorun} from 'mobx-react'

import './index.css';
import ShoppingList from './components/ShoppingList'
import Header from './components/Header'
import ShoppingFooter from './components/ShoppingFooter.js'
import ShoppingCart from './components/ShoppingCart.js'
import {ITEMS} from './components/Items'
import MobxStore from "./components/MobxStore";

const API = "https://shopping-spring.cfapps.io/api/shoppingItems";
const Home = observer(class Home extends React.Component {
        constructor(props) {
            super(props);
            this.data = new MobxStore();
        }

        componentWillMount() {
            fetch(API, {
                // mode: "no-cors",
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                })
                .then(response => {
                    let _items = response._embedded.shoppingItems;
                    _items.map((item, index) => {
                        item = Object.assign(item, {count: 1})
                    });
                    this.data.replace({items: _items});
                });
        }

        render() {
            return (
                <div>
                    <Header title="商店没钱"/>
                    <div className="container">
                        <ShoppingList
                            data={this.data}
                            items={this.data.itemData.items}
                        />
                        <ShoppingFooter clickBuyButton={this.handleClickBuyButton}/>
                        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">购物车</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <ShoppingCart
                                            data={this.data}
                                            cart={this.data.cartData.items}
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close
                                        </button>
                                        <button type="button" className="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            )
        }

    }
    )
;

ReactDOM
    .render(
        <Home/>,
        document
            .getElementById(
                'root'
            )
    )
;
