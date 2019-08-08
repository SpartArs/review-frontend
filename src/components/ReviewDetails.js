import React, {Component} from 'react';
import {extractError} from "../utils/utils";
import client from '../http/client';
import PropTypes from 'prop-types';
import Loader from "./Loader";
import Comment from "./Comment";


class ReviewDetails extends Component {
    state = {
        loading: false,
        item: null,
        error: null
    };

    async componentWillMount() {
        try {
            const rewiewId = this.props.match.params.id;
            this.setState({loading: true, error: null});
            const response = await client.get(`/reviews/${rewiewId}`);

            const item = response.data;
            this.setState({item, loading: false});
        } catch (e) {
            this.setState({error: extractError(e), loading: false});
        }
    }

    onCommentChange(evt) {

    }

    onCommentSubmit() {

    }

    render() {
        if (this.state.loading) {
            return (<Loader/>);
        }

        const item = this.state.item;

        return (
            <div className="container">
                <h3>{item.reviewTitle}</h3>
                <div>{item.author.name}</div>
                <div><img src={process.env.PUBLIC_URL + item.fileName}/></div>
                <div>{item.category.title}</div>
                <div>{item.content}</div>
                <div><Comment/></div> //TODO: комментарии
                <form>
                    <div className="form-group">
                        <label htmlFor="content">Text</label>
                        <textarea
                            id="comment"
                            name="comment"
                            className="form-control"
                            placeholder="Оставьте комментарий..."
                            // value={comment}
                            onChange={(evt) => this.onCommentChange(evt)}
                        />
                        <button type="submit" className="btn btn-outline-success"
                                disabled={this.state.loading}
                                 onSubmit={() => this.onCommentSubmit()}
                        >Отправить</button>
                    </div>

                </form>
            </div>

        );
    }



}

ReviewDetails.propTypes = {};

export default ReviewDetails;
