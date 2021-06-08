import './SignUp.css';
import React from 'react';
import {NavSignUp} from '../NavBar/NavBar';
import {MainButton, MainInputBox} from '../Components/Components.js';
import {newAccount} from '../actions/user.js';

class SignUp extends React.Component{
	state = {
		Username: "",
		firstName: "",
		lastName: "",
		Password: "",
		toggleUsername: 0,
		toggleFirstname: 0,
		toggleLastname: 0,
		togglePassword: 0,
		doesUserExist: undefined
	}
	handleChange = (event) => {
		let inputValueSignUp = event.target.value;
		const inputBoxName = event.target.name;
		inputValueSignUp = inputValueSignUp.replace(/\s/g,'');
		this.setState({
			[inputBoxName]: inputValueSignUp
		});
		if(inputValueSignUp === ""){
			if (inputBoxName === "Username" ){
				this.state.toggleUsername = 1;
			}else if (inputBoxName === "firstName"){
				this.state.toggleFirstname = 1;
			}else if (inputBoxName === "lastName"){
				this.state.toggleLastname = 1;
			}else if (inputBoxName === "Password"){
				this.state.togglePassword = 1;
			}
		}else{ // to reset 
			if (inputBoxName === "Username" ){
				this.state.toggleUsername = 0;
			}else if (inputBoxName === "firstName"){
				this.state.toggleFirstname = 0;
			}else if (inputBoxName === "lastName"){
				this.state.toggleLastname = 0;
			}else if (inputBoxName === "Password"){
				this.state.togglePassword = 0;
			}
		}
	}
	signUpUser = (event) => {
		
		// make a get request to database and check whether an account in the database has the same email as one that was inputted by the user
		if(this.state.Username !== '' && this.state.firstName !== '' && this.state.lastName !== '' && this.state.Password !== ''){
			
			// make a post request to the database to create a new entry for the new user
				const newAccountInfo = {
					Username: this.state.Username,
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					Password: this.state.Password,
				}
				const {app} = this.props;
				newAccount(newAccountInfo, this, app);
		} else{
			if (this.state.Username === ""){
				this.setState({
					toggleUsername: 1
				});
			}
			if (this.state.firstName === ""){
				this.setState({
					toggleFirstname: 1
				});
			}
			if (this.state.lastName === ""){
				this.setState({
					toggleLastname: 1
				});
			}
			if (this.state.Password === ""){
				this.setState({
					togglePassword: 1
				});
			}
		}
		
		
	}
	render(){
		return(
			<div>
				<NavSignUp />
				<div className = "centerDivSignUp">
					<h1> Sign Up</h1>
					<form id = "signUp">
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
							textBoxName="firstName" 
							placeholderName="First Name" 
							type= "text"
							change = {this.handleChange}
							textValue = {this.state.firstName}
							userInput = {this.state.toggleFirstname}
							app = {this}
						/>
						<MainInputBox
							textBoxName="lastName" 
							placeholderName="Last Name" 
							type= "text"
							change = {this.handleChange}
							textValue = {this.state.lastName}
							userInput = {this.state.toggleLastname}
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
							text = "Sign Up"
							change = {this.signUpUser}
						/>
					</form>
				</div>	
			</div>
		);
	}
}

export default SignUp;