import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Comment extends Component {
    render() {
        const {item} = this.props;
        return (
            <div>
                <div className="border">
                    <div><h6>{item.author.name}</h6></div>
                    <div>{item.date}</div>
                </div>
                <div>
                    <div>{item.text}</div>
                </div>
            </div>


        );
    }
}

Comment.propTypes = {
    item: PropTypes.object.isRequired
};


export default Comment;