import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';


class ReviewItem extends Component {

    render() {
        const {item} = this.props;
        return (
            <div className="card">
                <div className="card-header">
                    <Link to={`/reviews/${item.id}`}><h5>{item.reviewTitle}</h5></Link>
                </div>
               <Link to={`/reviews/${item.id}`}> <img src={process.env.PUBLIC_URL + item.fileName} className="card-img-top" alt="..."/> </Link>
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><h6>Автор:</h6>{item.author.name}</li>
                        <li className="list-group-item"><h6>Категория:</h6>{item.category.title}</li>
                    </ul>
                </div>
                <div className="card-footer">
                    {item.tags.map(o => <a href="" key={o} className="card-link">#{o}</a>)}
                </div>
            </div>
        );
    }
}

ReviewItem.propTypes = {
    item: PropTypes.object.isRequired
};

export default withRouter(ReviewItem);