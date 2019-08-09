import React, { Component } from 'react';

class Dropdown extends Component {

    render() {
        return (
            <div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar2"
                        aria-controls="navbar2" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse"
                     id="navbar2">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Категории</a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown1">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Dropdown;