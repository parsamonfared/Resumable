import './NavBar.css';
import React from 'react';
import logo from '../images/Logo.png'
import {Link} from 'react-router-dom';
import {Navbar, Nav, Button} from 'react-bootstrap'
import {logoutUser} from '../actions/user.js';

class NavHome extends React.Component{
	render(){
		return(
			<nav id="Navigation">
				<Link to='/'>
					<img className="Logo" src={logo}/>
				</Link>
				<ul>
					<Link to='/SignUP'>
					<li className="SignUP">Sign Up</li>
					</Link>
					<Link to='/Login'>
					<li className="Login">Log In</li>
					</Link>
				</ul>
			</nav>
		
		);
	}
}

class NavLogin extends React.Component{
	render(){
		return(
			<nav id="Navigation">
				<Link to='/'>
					<img className="Logo" src={logo}/>
				</Link>
			</nav>
		
		);
	}
}

class NavSignUp extends React.Component{
	render(){
		return(
			<nav id="Navigation">
				<Link to='/'>
					<img className="Logo" src={logo}/>
				</Link>
				<ul>
					<Link to='/Login'>
					<li className="Login">Log In</li>
					</Link>
				</ul>
				<p> Already have an account?</p>
			</nav>
		
		);
	}
}

class NavExplore extends React.Component{
	handleChangeLogoutUser = (event) => {
		this.props.log.push('/Login');
		logoutUser(this.props.app);
	}

	render(){
		let link;
		if(this.props.app.state.currentUser === "admin"){
			link = 	<Link className = 'home-style' to="/Admin">Overview</Link>			
		}
		return(
				<Navbar bg="dark" variant="dark">
					<Navbar.Brand href="/Explore">
						<img
							alt=""
							src={logo}
							width="80"
							height="50"
							className="d-inline-block align-top"
							/>{' '}
					</Navbar.Brand>
					<Nav className="mr-auto">
						<Link className = 'home-style' to="/Explore">Home</Link>
						<Link className = 'home-style' to="/Profile">{this.props.app.state.currentUser}</Link>
						{link}
						{/* <p className = 'loginTag' > Logged In As <span className = 'loginTagUser'> {this.props.app.state.currentUser} </span></p> */}
					</Nav>
					<Button onClick={this.handleChangeLogoutUser} variant="outline-info">Logout</Button>
				</Navbar>
		);
	}
}

export {NavHome, NavSignUp, NavLogin, NavExplore};

