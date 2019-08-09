import React, {Component} from 'react';
import PropTypes from 'prop-types';
import client from '../http/client';
import routes from "../routes/routes.js";


class CreateReview extends Component {
    state = {
        formData: {
            reviewTitle: '',
            content: '',
            category: '',
            tags: [],
            file: null
        },
        // file: null,
        categories: []
    };


    async componentDidMount() {
        const categoriesResponse = await client.get('/reviews/categories');
        const categories = categoriesResponse.data;

        this.setState({categories});
    }

    onSubmit = async (evt) => {

        evt.preventDefault();
        const {content, category, file} = this.state.formData;

        const data = new FormData();
        data.append("file", file);
        // data.append("content", content);
        // data.append("category", category);
        console.log(data);

        const formData = new FormData();
        Object.keys(this.state.formData).forEach((key => {
            formData.append(key, this.state.formData[key]);
        }));
        client.post('/reviews/create', formData);

        this.props.history.push(routes.recentReviews);

    };


    onChange = (evt) => {
        const {name, value} = evt.target;
        // if (name == "tags") {
        //    const tags = value.splitText();
        //    alert(tags.length);
        // }
        const formData = {...this.state.formData, [name]: value};

        this.setState({formData: formData});
    };

    handleUpload = (evt) => {
        const {name, value} = evt.target;
        const file = evt.target.files[0];
        const formData = {...this.state.formData, [name]: file};

        this.setState({formData: formData});

    };


    render() {
        const {categories} = this.state;
        const {content, category, tags, reviewTitle} = this.state.formData;
        return (
            <div>

                <form onSubmit={(evt) => this.onSubmit(evt)}
                    // encType="multipart/form-data"
                >
                    <div className="form-group">
                        <label htmlFor="reviewTitle"><h5>Заголовок</h5></label>
                        <input
                            id="reviewTitle"
                            name="reviewTitle"
                            className="form-control"
                            placeholder="Введите заголовок"
                            value={reviewTitle}
                            onChange={(evt) => this.onChange(evt)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content"><h5>Текст отзыва</h5></label>
                        <textarea
                            id="content"
                            name="content"
                            className="form-control"
                            placeholder="Введите текст отзыва"
                            value={content}
                            onChange={(evt) => this.onChange(evt)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="file"><h5>Изображение</h5></label>
                        <input
                            formEncType="multipart/form-data"
                            id="file"
                            name="file"
                            className="form-control"
                            type="file"
                            placeholder="Input picture"
                            // value={file}
                            onChange={(evt) => this.handleUpload(evt)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category"><h5>Категория</h5></label>
                        <select
                            id="category"
                            name="category"
                            className="form-control"
                            value={category}
                            onChange={(evt) => this.onChange(evt)}
                            required
                        >{categories.map(o => <option key={o.id} value={o.id}>{o.title}</option>)}</select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="tags"><h5>Тэги</h5></label>
                        <textarea
                            id="tags"
                            name="tags"
                            className="form-control"
                            value={tags}
                            onChange={(evt) => this.onChange(evt)}
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-outline-success" disabled={this.state.loading}>Создать
                        </button>
                    </div>
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
