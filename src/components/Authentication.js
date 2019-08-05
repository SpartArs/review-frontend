import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../http/client';
import AuthenticationContext from '../context/AuthenticationContext';
import routes from "../routes/routes.js";
import Loader from "./Loader.js";
import { extractError } from "../utils/utils.js";

class Authentication extends Component {
    state = { // хранит данные, введённые в поля ввода + loading
        loading: false,
        formData: {
            username: '',
            password: '',
        },
        error: null,
    };

    // async componentDidMount() {
    //     try {
    //         const response = await client.post('/authentication', {
    //             username: 'vasya',
    //             password: 'secret',
    //         });
    //         // destructuring
    //         const { token } = response.data; // const token = response.token;
    //         this.context.authenticate(token);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }
    //
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
            this.setState({error : extractError(e), loading: false});
        }
    };


    onChange = (evt) => {
        // console.log(evt);
        // console.log(evt.target);

        // setState -> pure functions
        // list.stream().filter(o -> o.is...).collect(Collectors.toList())

        // evt.target.name -> username | password
        // username: '...',
        // password: '...',
        // x: evt.target.value
        // if (evt.target.name === 'username') {
        //     const formData = {...this.state.formData, username: evt.target.value};
        // } else if (evt.target.name === 'password') {
        //     const formData = {...this.state.formData, password: evt.target.value};
        // }
        //  const formData = {...this.state.formData, [evt.target.name]: evt.target.value};
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
                <h1>LOGIN PAGE</h1>
                <br/>
                {
                    this.state.error &&
                    <div className="alert alert-danger">{this.state.error}</div>
                }
                {
                    this.state.loading && <Loader />
                }
                <form onSubmit={(evt) => this.onSubmit(evt)}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            className="form-control"
                            type="email"
                            placeholder="Input your email"
                            value={username}
                            onChange={(evt) => this.onChange(evt)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            className="form-control"
                            type="password"
                            placeholder="Input your password"
                            value={password}
                            onChange={(evt) => this.onChange(evt)}
                            required
                        />
                    </div>


                    <button type="submit" className="btn btn-outline-success" disabled={this.state.loading}>Login</button>
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
