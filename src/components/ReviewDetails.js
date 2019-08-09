import React, {Component} from 'react';
import {extractError} from "../utils/utils";
import client from '../http/client';
import PropTypes from 'prop-types';
import Loader from "./Loader";
import Comment from "./Comment";


class ReviewDetails extends Component {
    state = {
        formData: {
            commentText: "",
            reviewId: this.props.match.params.id
        },
        loading: false,
        item: null,
        error: null,
        comments: []
    };


    async componentWillMount() {
        try {
            const reviewId = this.props.match.params.id;
            this.setState({loading: true, error: null});
            const itemResponse = await client.get(`/reviews/${reviewId}`);
            const item = itemResponse.data;

            const commentsResponse = await client.get(`/reviews/comments/${reviewId}`);
            const comments = commentsResponse.data;

            this.setState({item, comments, loading: false});

        } catch (e) {
            this.setState({error: extractError(e), loading: false});
        }
    }

    onCommentChange(evt) {
        const {name, value} = evt.target;

        const formData = {...this.state.formData, [name]: value};

        this.setState({formData: formData});
    }

    onCommentSubmit = async (evt) => {
        evt.preventDefault();
        const {commentText, reviewId} = this.state.formData;

        try {
            this.setState({loading: true, error: null});
            const response = await client.post('/reviews/comments/add', {
                commentText,
                reviewId,
            });
            this.setState({error: null, loading: false});

            this.state.comments.push(response.data);
            this.setState(this.state.comments);

        } catch (e) {
            this.setState({error : extractError(e), loading: false});
        }
    };

    render() {
        if (this.state.loading) {
            return (<Loader/>);
        }

        const item = this.state.item;
        const comments = this.state.comments;

        return (
            <div className="container">
                <h3>{item.reviewTitle}</h3>
                <div>{item.author.name}</div>
                <div><img src={process.env.PUBLIC_URL + item.fileName}/></div>
                <div>{item.category.title}</div>
                <div>{item.content}</div>
                <div>{comments.map(o => <div className="col-6 mb-3" key={o.id}><Comment item={o} /></div>)}</div>
                <form onSubmit={(evt) => this.onCommentSubmit(evt)}>
                    <div className="form-group">
                        {/*<label htmlFor="content">Text</label>*/}
                        <textarea
                            id="commentText"
                            name="commentText"
                            className="form-control"
                            placeholder="Оставьте комментарий..."
                            // value={comment}
                            onChange={(evt) => this.onCommentChange(evt)}
                        />
                        <div className="d-flex justify-content-end mt-1">
                            <button type="submit" className="btn btn-outline-success" disabled={this.state.loading}>Отправить</button>
                        </div>
                    </div>

                </form>
            </div>

        );
    }



}

ReviewDetails.propTypes = {};

export default ReviewDetails;
