import React from 'react';

export default class ShoppingFooter extends React.Component {

    render(){
        return (
            <div className="card">
                <div className="card-body">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">结算</button>
                </div>
            </div>
        )
    }
}