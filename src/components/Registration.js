import React, {Component} from 'react';
import PropTypes from 'prop-types';
import client from "../http/client";
import routes from "../routes/routes.js";
import Loader from "./Loader.js";
import { extractError } from "../utils/utils.js";

class Registration extends Component {
    state = { // хранит данные, введённые в поля ввода + loading
        loading: false,
        formData: {
            username: '',
            password: '',
        },
        error: null,
    };

    onSubmit = async (evt) => {

        evt.preventDefault();

        // destructuring
        const {name, username, password} = this.state.formData;

        try {
            const response = await client.post('/registration', {
                name,
                username,
                password
            });

            this.props.history.push(routes.authentication);

        } catch (e) {

        }
    };

    onChange = (evt) => {
        const {name, value} = evt.target;
        const formData = {...this.state.formData, [name]: value};

        this.setState({formData: formData});
    };

    render() {
        if (this.state.error) {
            return <h1>Error occurred!</h1>;
        }

        const {name, username, password} = this.state.formData;

        return (
            <div>
                <h1>REGISTRATION PAGE</h1>
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
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            className="form-control"
                            type="text"
                            placeholder="Input your name"
                            value={name}
                            onChange={(evt) => this.onChange(evt)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Email</label>
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

                    {/*<div className="form-group">*/}
                        {/*<label>Repeat password</label>*/}
                        {/*<input*/}
                            {/*id="repassword"*/}
                            {/*name="repassword"*/}
                            {/*className="form-control"*/}
                            {/*type="password"*/}
                            {/*placeholder="Repeat your password"*/}
                            {/*value={repassword}*/}
                            {/*onChange={(evt) => this.onChange(evt)}*/}
                            {/*required*/}
                        {/*/>*/}
                    {/*</div>*/}
                    <button type="submit" className="btn btn-outline-success" disabled={this.state.loading}>SignUp</button>
                </form>

            </div>
        );
    }
}

Registration.propTypes = {};

export default Registration;
