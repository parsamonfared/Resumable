import React, { useState, useEffect, Suspense} from 'react';
import './profile.css';
import { useHistory } from "react-router"
import { styled, withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ground from '../images/ground.jpg'
import acount from '../images/acount.png'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {NavExplore} from "../NavBar/NavBar"
import CardComponent from '../CardComponent/CardComponent';
import "../styles.css";
import Modal from 'react-bootstrap/Modal'
import {fetchPostsData} from '../actions/post.js';
import {updateFileUserInfo ,updateUserInfo, fetchUsersData} from '../actions/user.js';
import {TextField, OutlinedInput, Box} from '@material-ui/core';
import { Document, Page, pdfjs } from 'react-pdf';
import PdfDisplay from '../PdfDisplay/PdfDisplay'
import ENV from './../config.js'
const API_HOST = ENV.api_host;


  const GreenButton_explore = styled(Button)({
	backgroundColor: '#71A89E',
	borderRadius: '5px',
	marginLeft: '50px',
	marginTop: '15px',
	color: "white",
	Height: '48px',
	minWidth: '150px',
	textTransform: 'capitalize',
	"&:hover": {
		backgroundColor: "#009688",
		color: 'white'
	}
});

 

  const useStyles2 = makeStyles((theme) => ({
	root: {
		flex: 1,
		backgroundImage: ground
	  },
	  toolbar: theme.mixins.toolbar,
	  content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		
	  },
	  
	 

	  but:{
		top: 10,
		left: 130,
		background: 'linear-gradient(to top, #818b94, #808c9a, #7f8d9f, #808da5, #828daa, #818aa9, #8087a8, #8084a7, #7b7ea0, #767899, #717393, #6c6d8c)',
		borderRadius: 3,
		border: 0,
		color: 'black',
		height: 48,
		marginLeft: 10,
		width: 235,
		color: '#C6D8D7'
	  },
	
	  card: {
		display: 'flex',
		width: 400,
		marginTop: 250,
		marginLeft: 25,
		background: 'linear-gradient(to top, #818b94, #808c9a, #7f8d9f, #808da5, #828daa, #818aa9, #8087a8, #8084a7, #7b7ea0, #767899, #717393, #6c6d8c)',
		padding: '0 30px',
	  },
	  cardDetails: {
		flex: 1,
		width: 350,
	
	  },
	  cardMedia: {
		width: 180,
	  },
	  typography: {
	    textAlign: 'center',
		fontSize: 25,
		color: '#C6D8D7'
	  },
	  pdf:{
		  left: 400,
		  top: 400,
		  width: 400
	  },
	  appBar:{
		  flex: 1
	  },
	  image:{
		  height:60
	  }
}));
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
const images = importAll(require.context('../images', false, /\.(gif|jpe?g|svg|png)$/));


export default function Profile1(propss){
	const history = useHistory();
    useEffect(() =>{
        history.push('/Profile');
    }, [history]);
	let pd = null;
	const [post, setPost] = React.useState(false);

	const resource = fetchPostsData();
		function GetPosts(){
			
			const got_posts = resource.posts.read();
			const user = propss.app.state.currentUser;
			return(
				<div>
				<div className="oldPosts">
					
					{got_posts.length === 0 ?(
						<h5 className="posts_empty">No Posts Yet</h5>
					) :
					(
						<div>
					
							<Grid container 
								spacing={10}
								p = {1}
								direction="column"
								alignItems="center"
								justify="flex-end">
									{got_posts.map((item,index)=>{
										
										
										
										if(item.Username == user){
											pd = item.file;
											setPost(true)
										return(
											<div>
											
											<Grid className="grids" style={{margin: 10}} key={index} item xs = {12}>
													
													
													<CardComponent 
														post= {item}
														user = {user}
														width = {500}
													/>
													
												</Grid>
												</div>
										)}
									})}
									</Grid>
									</div>
								)}
								

				</div>
				
				<div>
					{post ? (<h4 id='h4'>Resume</h4>) : (null)}
					<div className="Apps">
				
					{post ? (
					<PdfDisplay url={`${API_HOST}/files/${pd}`} width={0.4} ></PdfDisplay>) : (null)}
					</div>
				</div>
				</div>
			);
			
		}

	const resour = fetchUsersData();
	function GetUsers(){ 
		const classes = useStyles2();
		const user = propss.app.state.currentUser;
		


		var username = "";
		var firstName = "";
		var lastName = "";
		var birthday = "";
		var program = "";

		const got_posts = resour.posts.read();
		return(
			<div>
			
				
			<div>
				
				{got_posts.length === 0 ?(
					<h5 className="posts_empty">No Posts Yet</h5>
				) :
				(
					
						<Grid container 
							spacing={10}
							p = {1}
							direction="column"
							alignItems="center"
							justify="flex-end">
								{got_posts.map((item)=>{
									if(item.Username == user){
									// setUsername(item.Username);
									// setFirstName(item.firstName);
									// setLastName(item.lastName);
									// setBirthday(item.dateOfBirth);
									// setProgram(item.program);
									 username = item.Username
									 firstName = item.firstName
									 lastName = item.lastName
									 birthday = item.dateOfBirth
									 program = item.Program
									}

								})}
								</Grid>
								
							)}

			</div>
			<Card className={classes.card}>
								<div className={classes.cardDetails}>
									<CardContent>
										<Typography className={classes.typography}>Username: {username}</Typography>
										<Typography className={classes.typography}>First Name: {firstName}</Typography>
										<Typography className={classes.typography}>Last Name: {lastName}</Typography>
										<Typography className={classes.typography}>Date of Birth: {birthday}</Typography>
										<Typography className={classes.typography}>Program: {program}</Typography>
									
									</CardContent>
								</div>
							</Card>
			</div>
		);
		
	}
	const classes = useStyles2();
	const [modalShow, setModalShow] = React.useState(false);
	const [update, setUpdate] = React.useState(false);


    



	function afterUpdate(){
		setUpdate(false);
	}
	
	


	  function UpdateInterface(props) {
		const [file, setFile] = React.useState('');
		const handleFileChange = (f) => {
			setFile(f);
		};
		const [title, setTitle] = React.useState('');
		const handleTitleChange = (event) => {
			setTitle(event.target.value);
		};
		
		const [subtitle, setSubtitle] = React.useState('');
		const handleSubtitleChange = (event) => {
			setSubtitle(event.target.value);
		};
		const [name, setName] = React.useState('');
		const handleNameChange = (event) => {
			setName(event.target.value);
		};
		const [lastname, setLastname] = React.useState('');
		const handleLastnameChange = (event) => {
			setLastname(event.target.value);
		};
	
		const [desc, setDesc] = React.useState('');
		const handleDescChange = (event) => {
			setDesc(event.target.value);
		};
		function postit(){
			
			const user = propss.app.state.currentUser;
		
				setModalShow(false)
			
				const np = {
					Username: user,
					Program: title,
					dateOfBirth: subtitle,
					firstName: name,
					lastName: lastname
					
				}
			

				updateUserInfo(np);
				window.location.reload(false);
			

			
		}
		return (
		  <Modal 
			{...props}
			size='xl'
			aria-labelledby="contained-modal-title-vcenter"
			centered
		  >
			<Modal.Header closeButton>
			  <Modal.Title id="contained-modal-title-vcenter">
				update info
			  </Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<div>
			<div className='Title_input'>     

			<OutlinedInput
				id="outlined-name"
				name="name"
				value={name}
				placeholder="Name"
				onChange={handleNameChange}
				variant="outlined"/>    


			</div>
		<div className='Title_input'>     

			<OutlinedInput
				id="outlined-name"
				name="lastname"
				value={lastname}
				placeholder="lastname"
				onChange={handleLastnameChange}
				variant="outlined"/>    
		   

		</div>
		
		<div className='Title_input'>     

			<OutlinedInput
				id="outlined-name"
				name="Program*"
				value={title}
				placeholder="Program"
				onChange={handleTitleChange}
				variant="outlined"/>    
		   

		</div>
		<div className='Subtitle_input'>
			<Box width={500}>
				<TextField
					id="subtitle-textarea"
					name="Date of Birth"
					value={subtitle}
					placeholder="Date of Birth"
					onChange={handleSubtitleChange}
					variant="outlined"
					fullWidth
				/>
			</Box>
		
		
			
		</div>
		

	</div>
			</Modal.Body>
			<Modal.Footer>
			  <Button color= 'secondary'  onClick={props.onHide}>Close</Button>
			  <Button color= "primary"  onClick={() => {
				  postit();
				  afterUpdate();
			}}>
				update
			  </Button>
			</Modal.Footer>
		  </Modal>
		);
	  }

	  

		return(
			
		<div className={classes.root} >
			
		
			<NavExplore app = {propss.app} log = {propss.history}/>

			<div id="info">
        		<img className="pic" src={acount} />
				<Suspense fallback={<h2>Loading users...</h2>}>
				<GetUsers/>
            	</Suspense>
				<buttonGroup>
				{/* <GreenButton_explore variant="contained" onClick={() => setModalShow(true)}>
			        {'upload resume'}
		        </GreenButton_explore>	 */}
				<GreenButton_explore variant="contained" onClick={() => setUpdate(true)}>
			        {'update info'}
		        </GreenButton_explore>	
				</buttonGroup>

				{/* <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                /> */}

				<UpdateInterface
                    show={update}
                    onHide={() => setUpdate(false)}
                />
				</div>
				
				<Suspense fallback={<h2>Loading Posts...</h2>}>
                    <GetPosts/>
                </Suspense>
					 {/* {post ? afterPost(): null}  */}
					
				</div>
			

				
	
			
		)
	}


