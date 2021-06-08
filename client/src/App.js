import './App.css';
import React from 'react';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';
import HighlightFeedBack from './HighlightFeedback/HighlightFeedback';
import HighlightFeedBackView from './HighlightFeedbackView/HighlightFeedbackView';
import Explore from './Explore/Explore'
import PostPage from './Postpage/PostPage'
import ResumeView from './ResumeView/ResumeView'
import Admin from './Admin/admin';
import Profile from './Profile/profile';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {checkUserSession} from './actions/user.js';



class App extends React.Component{
	
	state = {
		currentUser: null,
		currpage: 'home',
		adminCounter: 0
	}
	componentWillMount(prev){
		// if(this.state.currpage !== prev.state.currpage){
			checkUserSession(this);
		// }
	}
		
	render(){
		const {currentUser} = this.state;
		return (
            <Router>
                <Switch>

                    <Route
                        exact path={["/Login"]}
                        render={ props => (
                            <div className="app">
                                { /* Different componenets rendered depending on if someone is logged in. */}
                                {!this.state.currentUser ? <Login {...props} app={this} /> : (this.state.currentUser === 'admin'? <Admin {...props} app={this} /> : <Explore {...props} app={this} />)}
                            </div>                   // ... spread operator - provides all of the props in the props object
                        )}
                    />
					<Route
                        exact path="/SignUp"
                        render={ props => (
							<div className="app">
							{ /* Different componenets rendered depending on if someone is logged in. */}
								{this.state.currentUser ? <Explore {...props} app={this} /> : <SignUp {...props} app={this} />}
							</div> 
                        )}
                    />
						<Route path="/" exact component={Home} {...this.props} app={this}/>
						<Route path="/PostPage" component={PostPage} {...this.props} app={this}	/>
						<Route path="/ResumeView/:id" 
							render={ props => (
								<div className="app">
								{ /* Different componenets rendered depending on if someone is logged in. */}
									{this.state.currentUser ? <ResumeView {...props} app={this} /> : <Login {...props} app={this} />}
								</div> 
							)}
						/>
						<Route
							path="/Profile"
							render={ props => (
								<div className="app">
								{ /* Different componenets rendered depending on if someone is logged in. */}
									{this.state.currentUser ? <Profile {...props} app={this} /> : <Login {...props} app={this} />}
								</div> 
							)}
                    	/>
						<Route
							path="/Admin"
							render={ props => (
								<div className="app">
								{ /* Different componenets rendered depending on if someone is logged in. */}
									{this.state.currentUser ? <Admin {...props} app={this} /> : <Login {...props} app={this} />}
								</div> 
							)}
                    	/>

						<Route 
							path="/highlight-feedback/:id" 
							render={ props => (
								<div className="app">
								{ /* Different componenets rendered depending on if someone is logged in. */}
									{this.state.currentUser ? <HighlightFeedBack {...props} app={this} /> : <Login {...props} app={this} />}
								</div> 
							)}
						
						/>
						<Route 
							path="/highlight-feedback-view/:id" 
							render={ props => (
								<div className="app">
								{ /* Different componenets rendered depending on if someone is logged in. */}
									{this.state.currentUser ? <HighlightFeedBackView {...props} app={this} /> : <Login {...props} app={this} />}
								</div> 
							)}
						
						/>
						<Route
							path="/Explore"
							render={ props => (
								<div className="app">
								{ /* Different componenets rendered depending on if someone is logged in. */}
									{this.state.currentUser ? <Explore {...props} app={this} /> : <Login {...props} app={this} />}
								</div> 
							)}
                    	/>

                    { /* 404 if URL isn't expected. */}
                    <Route render={() => <div>404 Not found</div>} />

                </Switch>
            </Router>
        );

	}
}

export default App;
