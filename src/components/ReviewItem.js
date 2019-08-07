import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import routes from "../routes/routes.js";
import ReviewDetails from "./ReviewDetails";


class ReviewItem extends Component {

    onClickItem = (id) => {
        console.log(id)
        this.props.history.push(routes.reviewDetails);
        // if (name == "tags") {
        //    const tags = value.splitText();
        //    alert(tags.length);
        // }
        // const formData = {...this.state.formData, [name]: value};
        //
        // this.setState({formData: formData});
    };

    render() {
        const {item} = this.props;
        return (
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title" >{item.reviewTitle}</h5>
                    {/*<h5 className="card-title">{item.reviewTitle}</h5>*/}
                </div>
                <img src={process.env.PUBLIC_URL + item.fileName} className="card-img-top" alt="..."  key={item.id} onClick={() => this.onClickItem(item.id)}/>
                <div className="card-body">


                    <h5 className="card-text">Автор: {item.author.name}</h5>
                    {/*<p className="card-text">{item.content}</p>*/}
                    <p className="card-text">{"Категория: " + item.category.title}</p>
                    <div>
                        <button className="btn btn-light"><span role="img" aria-label="thumbs-up">&#x1F44E;</span></button>
                        <button className="btn btn-light"><span role="img" aria-label="thumbs-down">&#x1F44D;</span></button>
                        {/*<span className="btn">{item.likes}</span>*/}
                    </div>
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