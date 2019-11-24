import React, {Component} from 'react';
import PropTypes from 'prop-types';
import client from '../http/client';
import AuthenticationContext from '../context/AuthenticationContext';
import routes from "../routes/routes.js";
import Loader from "./Loader.js";
import {extractError} from "../utils/utils.js";

class Authentication extends Component {
    state = { // хранит данные, введённые в поля ввода + loading
        loading: false,
        formData: {
            username: '',
            password: '',
        },
        error: null,
    };

    componentDidMount() {
        if (this.context.authenticated) {
            this.props.history.push(routes.recentReviews);
        }
    }

    onSubmit = async (evt) => {
        evt.preventDefault();

        // destructuring
        const {username, password} = this.state.formData;

        try {
            this.setState({loading: true, error: null});
            const response = await client.post('/authentication', {
                username, // username: username
                password, // password: password
            });
            const {token} = response.data; // const token = response.token;
            this.setState({error: null, loading: false});

            // setState нужно делать до push
            this.context.authenticate(token);
            this.props.history.push(routes.recentReviews);
        } catch (e) {
            this.setState({error: extractError(e), loading: false});
        }
    };


    onChange = (evt) => {

        const {name, value} = evt.target;
        const formData = {...this.state.formData, [name]: value};

        // в переданном state только ключ formData, поэтому loading и error не трогаем
        this.setState({formData: formData});
    };

    // if -> true/false
    // if -> null, undefined, '', false, 0 -> falsy values
    render() {
        const {username, password} = this.state.formData;

        return (
            <div>
                <h1>Авторизация</h1>
                <br/>
                {
                    this.state.error &&
                    <div className="alert alert-danger">{this.state.error}</div>
                }
                {
                    this.state.loading && <Loader/>
                }
                <form onSubmit={(evt) => this.onSubmit(evt)}>
                    <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <input
                            id="username"
                            name="username"
                            className="form-control"
                            type="email"
                            placeholder="Введите email"
                            value={username}
                            onChange={(evt) => this.onChange(evt)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            id="password"
                            name="password"
                            className="form-control"
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(evt) => this.onChange(evt)}
                            required
                        />
                    </div>

                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-outline-success" disabled={this.state.loading}>Войти
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

Authentication.propTypes = {
    history: PropTypes.object.isRequired
};
Authentication.contextType = AuthenticationContext;

export default Authentication;
