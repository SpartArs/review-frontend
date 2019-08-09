import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Comment extends Component {
    render() {
        const {item} = this.props;
        return (
            <div>
                <h1>{item.text}</h1>
            </div>
        );
    }
}

Comment.propTypes = {
    item: PropTypes.object.isRequired
};


export default Comment;