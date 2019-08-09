import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Comment extends Component {
    render() {
        const {item} = this.props;
        return (
            <div>
                <div className="media-body">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="author">{item.author.name}</div>
                            <div className="metadata">
                                <span className="date">{item.date}</span>
                            </div>
                        </div>
                        <div className="panel-body">
                            <div className="media-text text-justify">{item.text}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

Comment.propTypes = {
    item: PropTypes.object.isRequired
};


export default Comment;