import React, {Component} from 'react';
import PropTypes from 'prop-types';
import client from '../http/client';
import { extractError } from "../utils/utils.js";
import Loader from "./Loader.js";
import ReviewItem from "./ReviewItem"

class RecentReviews extends Component {
    state = {
        loading: false,
        items: [],
        error: null,
        categories: []
    };

    async componentDidMount() {
        try {
            this.setState({loading: true, error: null});
            const response = await client.get('/reviews/recent');
            const items = response.data;

            this.setState({items, loading: false});
        } catch (e) {
            this.setState({error : extractError(e), loading: false});
        }
    }

    render() {
        if (this.state.loading) {
            return (<Loader />);
        }

        const {items} = this.state;
        return (
            <div className="container">
                <div className="row">
                    {items.map(o => <div className="col-6 mb-3" key={o.id}><ReviewItem item={o} /></div>)}
                </div>
            </div>
        );
    }
}




RecentReviews.propTypes = {};

export default RecentReviews;