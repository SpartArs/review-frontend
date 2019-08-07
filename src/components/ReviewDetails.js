import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import routes from "../routes/routes.js";

class ReviewDetails extends Component {

    render() {
        // const id = this.props.match.state.id;
        return ( <h5>HELLO!</h5>)
    }

}

ReviewDetails.propTypes = {
    itemDetails: PropTypes.object.isRequired
};

export default ReviewDetails;
