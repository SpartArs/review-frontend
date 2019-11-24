import React, {Component} from 'react';
import client from "../http/client";
import routes from "../routes/routes.js";
import Loader from "./Loader.js";

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
                <h1>Регистрация</h1>
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
                        <label htmlFor="name">Имя</label>
                        <input
                            id="name"
                            name="name"
                            className="form-control"
                            type="text"
                            placeholder="Введите имя"
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
                            placeholder="Введите свой email"
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
                        <button type="submit" className="btn btn-outline-success"
                                disabled={this.state.loading}>Регистрация
                        </button>
                    </div>
                </form>

            </div>
        );
    }
}

Registration.propTypes = {};

export default Registration;
