import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from "react-router-dom";
import routes from "../routes/routes.js";
import AuthenticationContext from '../context/AuthenticationContext';
import "../css/navbar.css";
import Dropdown from './Dropdown';


class NavBar extends Component {
    onSignIn = () => { // чтобы не было проблем
        this.props.history.push(routes.authentication);
    };

    onSignUp = async () => {
        this.props.history.push(routes.registration);
    };

    createReview = async () => {
        this.props.history.push(routes.createReview);
    }

    onLogout = () => {
        this.context.unauthenticate();
    };

    render() {
        const isAuthenticated = this.context.authenticated;
        // const isAuthenticated = false;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary mb-1">
                <Link to={routes.recentReviews} className="navbar-brand">Отзывы</Link>
                {
                    isAuthenticated &&
                    <button className="navbar-toggler" typeof="button" data-toggle="collapse" data-target="#navbar1"
                            aria-controls="navbar2" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                }

                {
                    isAuthenticated &&
                    <div className="collapse navbar-collapse" id="navbar1">
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
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Поиск" aria-label="Search"/>
                            {/*<button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>*/}
                        </form>
                    </div>

                }



                <div>
                    {
                        isAuthenticated &&
                        <div>
                            <button className="btn btn-outline-light mr-1"
                                    onClick={() => this.createReview()}>Создать обзор
                            </button>
                            <button className="btn btn-outline-light"
                                    onClick={() => this.onLogout()}>Выход
                            </button>
                        </div>
                    }
                    {
                        !isAuthenticated &&
                        <div>
                            <button className="btn btn-outline-light mr-1"
                                    onClick={() => this.onSignIn()}>Вход
                            </button>
                            <button className="btn btn-outline-light"
                                    onClick={() => this.onSignUp()}>Регистрация
                            </button>
                        </div>
                    }
                </div>
            </nav>
        );
    }
}

NavBar.propTypes = {
    history: PropTypes.object.isRequired
};
NavBar.contextType = AuthenticationContext;
export default withRouter(NavBar);