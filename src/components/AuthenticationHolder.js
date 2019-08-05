import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import client from '../http/client';
import AuthenticationContext from '../context/AuthenticationContext';
import routes from '../routes/routes.js';

class AuthenticationHolder extends Component {
    state = {
        token: null,
        authenticated: false
    };  // менять только через setState

    // lifecycle methods
    constructor(props) {
        super(props);
        const token = localStorage.getItem('token');
        if (token) {
            this.state = {
               token, // token: token
               authenticated: true
            };
        }

        // 401 -> unauthorized
        // interceptor'ы
        client.interceptors.request.use(req => {
            if (this.state.token) {
                req.headers['X-Token'] = this.state.token;
            }
            return req;
        }, err => {
            return Promise.reject(err);
        });

        client.interceptors.response.use(res => {


            return res;
        }, err => {
            if (err.response === undefined) {
                // TODO:
                return Promise.reject(err);
            }

            if (err.response.status === 401) {
                this.unauthenticate();
                return;
            }
            if (err.response.status === 403) {
                this.props.history.push(routes.root);
                return;
            }

            return Promise.reject(err);
        })
    }

    unauthenticate = () => {
      localStorage.removeItem('token');
      this.setState({
          token: null,
          authenticated: false
      });
      this.props.history.push(routes.root);
    };

    authenticate = (token) => {
        localStorage.setItem('token', token);
        this.setState({
            token,
            authenticated: true
        });
    };

    // const src = {id: 1, value: 'token'};
    // const target = {...src}; // spread

    render() {
        const value = {
            authenticated: this.state.authenticated, // spread token: this.state.token, authenticated: this.state.authenticated
            unauthenticate: this.unauthenticate,
            authenticate: this.authenticate
        }; // то, что мы прокидываем вниз детям
        // value -> у детей в this.context (если они прописали contextType = AuthenticationContext)
        return (
            <AuthenticationContext.Provider value={value}>
                {this.props.children}
            </AuthenticationContext.Provider>
        );
    }
}

AuthenticationHolder.propTypes = {};

export default withRouter(AuthenticationHolder);
