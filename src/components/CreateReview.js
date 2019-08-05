import React, {Component} from 'react';
import PropTypes from 'prop-types';
import client from '../http/client';
import routes from "../routes/routes.js";


class CreateReview extends Component {
    state = {
        formData: {
            content: '',
            category: ''
        },
        categories: []
    };


    async componentDidMount() {
        const categoriesResponse = await client.get('/reviews/categories');
        const categories = categoriesResponse.data;

        this.setState({categories});
    }

    onSubmit = async (evt) => {

        evt.preventDefault();
        const {content, category} = this.state.formData;

        try {
            const config = {headers: {
                    "Content-Type": "multipart/form-data"
                }
            };
            const response = await client.post('/reviews/create', {
                content,
                category
            }, config);
            // await client.setRequestHeader("Content-Type", "multipart/form-data");

            this.props.history.push(routes.recentReviews);

        } catch (e) {
            console.log(e.messageerror);
        }
    };


    onChange = (evt) => {
        const {name, value} = evt.target;
        const formData = {...this.state.formData, [name]: value};

        this.setState({formData: formData});
    };


    render() {
        const {categories} = this.state;
        const {content, category} = this.state.formData;
        return (
            <div>

                <form onSubmit={(evt) => this.onSubmit(evt)} encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="content">Text</label>
                        <textarea
                            id="content"
                            name="content"
                            className="form-control"
                            placeholder="Input review content"
                            value={content}
                            onChange={(evt) => this.onChange(evt)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="file">Picture</label>
                        <input
                            id="file"
                            name="file"
                            className="form-control"
                            type="file"
                            placeholder="Input picture"
                            onChange={(evt) => this.onChange(evt)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            className="form-control"
                            value={category}
                            onChange={(evt) => this.onChange(evt)}
                            required
                        >{categories.map(o => <option key={o.id} value={o.id}>{o.title}</option>)}</select>
                    </div>
                    <button type="submit" className="btn btn-outline-success" disabled={this.state.loading}>SignUp
                    </button>
                </form>

                {/*<h1>Create review</h1>*/}
                {/*<form onSubmit={(evt) => this.onSubmit(evt)>*/}
                {/*<textarea name="content" className="form-control" placeholder="Input content"/>*/}
                {/*/!*<input type="text" name="content" className="form-control" placeholder="Input content"/>*!/*/}
                {/*<input type="file" name="file" className="form-control" placeholder="Choose picture"/>*/}
                {/*<select name="category" className="form-control" required>{categories.map(o => <option key={o.id} value={o.id}>{o.title}</option>)}</select>*/}
                {/*<input type="submit" value="Отправить" onClick={() => this.onSubmit()}/>*/}
                {/*</form>*/}
            </div>
        );
    }
}

CreateReview.propTypes = {
    // item: PropTypes.object.isRequired
};

export default CreateReview;
