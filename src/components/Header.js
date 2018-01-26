import React from 'react';

export default function Header(props) {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <a href="#" className="navbar-brand">
                <img src={require('../images/brand.ico')} alt=""/>
                {props.title}
            </a>
        </nav>
    )
}
