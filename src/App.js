import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import routes from "./routes/routes.js";
import NavBar from "./components/NavBar";
import Authentication from "./components/Authentication";
import AuthenticationHolder from "./components/AuthenticationHolder";
import ReviewItem from "./components/ReviewItem";
import RecentReviews from "./components/RecentReviews";
import Registration from "./components/Registration";
import RegistrationCheckEmail from "./components/RegistrationCheckEmail";
import CreateReview from "./components/CreateReview";

// import NotFound from "./components/NotFound";

class App extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <BrowserRouter>
                            <AuthenticationHolder>
                                <NavBar/>
                                <div className="container">
                                <Switch>
                                    <Route exact={true} path={routes.authentication} component={Authentication}/>
                                    <Route exact={true} path={routes.registration} component={Registration} />
                                    <Route exact={true} path={routes.registrationCheckEmail} component={RegistrationCheckEmail} />
                                    <Route exact={true} path={routes.recentReviews} component={RecentReviews} />
                                    <Route exact={true} path={routes.authentication} component={ReviewItem}/>
                                    <Route exact={true} path={routes.createReview} component={CreateReview}/>
                                </Switch>
                                </div>
                            </AuthenticationHolder>
                        </BrowserRouter>
                    </div>
                </div>
            </div>

        );
    }


}

App.propTypes = {};

export default App;