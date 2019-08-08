import React, {Component} from 'react';
import {extractError} from "../utils/utils";
import client from '../http/client';
import PropTypes from 'prop-types';
import Loader from "./Loader";




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
            this.setState({error : extractError(e), loading: false});
        }
    }

    render() {
        if (this.state.loading) {
            return (<Loader />);
        }

        const item = this.state.item;

        return (
            <div className="container">
                <h5>HELLO!</h5>
                <div>{item.id}</div>
            </div>

        );
    }

}

ReviewDetails.propTypes = {};

export default ReviewDetails;
