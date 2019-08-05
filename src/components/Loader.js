import React, { Component } from 'react';

class Loader extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-center" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}

Loader.propTypes = {};

export default Loader;
