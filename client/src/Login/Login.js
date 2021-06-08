import './Login.css';
import React from 'react';
import {NavLogin} from '../NavBar/NavBar';
import {Link} from 'react-router-dom';
import {MainButton, MainInputBox} from '../Components/Components.js';
import {loginAccount} from '../actions/user.js';

class Login extends React.Component{
	
	constructor(props) {
        super(props);
    }
	state = {
		Username: "",
		Password: "",
		toggleUsername: 0,
		togglePassword: 0
	}
	handleChange = (event) => {
		const inputValueLogin = event.target.value;
		const inputBoxNameLogin = event.target.name
		this.setState({
			[inputBoxNameLogin]: inputValueLogin
		});
		if(inputValueLogin === ""){
			if (inputBoxNameLogin === "Username"){
				this.state.toggleUsername = 1;
			}else if (inputBoxNameLogin === "Password"){
				this.state.togglePassword = 1;
			}
		}else{ // to reset 
			if (inputBoxNameLogin === "Username" ){
				this.state.toggleUsername = 0;
			}else if (inputBoxNameLogin === "Password"){
				this.state.togglePassword = 0;
			}
		}
	}
	
	loginUser = () => {
		// request should be made to server to verify if the Username and Password is valid.
		if(this.state.Username === ""){
			this.setState({
				toggleUsername: 1
			});
		}
		if(this.state.Password === ""){
			this.setState({
				togglePassword: 1
			});
		}
		if(this.state.Password !== "" && this.state.Username !== ""){
			
			const newAccountInfo = {
					Username: this.state.Username,
					Password: this.state.Password,
			}
			const {app} = this.props;
			loginAccount(newAccountInfo, this, app);
		}
		
	}
	render(){
		return(
			<div>
				<NavLogin/>
				<div className = "centerDivLogIn">
					<h1> Log In</h1>
					<form>
						<MainInputBox
							textBoxName="Username" 
							placeholderName="Username" 
							type= "text"
							change = {this.handleChange}
							textValue = {this.state.Username}
							userInput = {this.state.toggleUsername}
							app = {this}
						/>
						<MainInputBox 
							textBoxName = "Password" 
							placeholderName="Password" 	
							inputType = "password" 
							change = {this.handleChange}
							textValue = {this.state.Password}
							userInput = {this.state.togglePassword}
							app = {this}
						/>
						<MainButton 
							text = "Login"
							change = {this.loginUser}
						/>
						<p id="linkP"> Dont have have an account? <Link className="linkCustom" to="/SignUP"> Click Here. </Link></p>
					</form>
				</div>	
			</div>
		)
	}
}

export default Login;