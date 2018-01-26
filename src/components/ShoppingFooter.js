import React from 'react';

export default class ShoppingFooter extends React.Component {

    render(){
        return (
            <div className="card">
                <div className="card-body">
                    <a href="#" className="btn btn-primary" onClick={this.props.clickBuyButton}>结算</a>
                </div>
            </div>
        )
    }
}