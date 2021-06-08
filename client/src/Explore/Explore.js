import React, { useState, useEffect, Suspense } from 'react'
import { useHistory } from "react-router"
import "./Explore.css"
import CardComponent from '../CardComponent/CardComponent';
import { Grid } from "@material-ui/core"
import {NavExplore} from "../NavBar/NavBar"
import Button from '@material-ui/core/Button';
import Modal from 'react-bootstrap/Modal'
import {styled} from '@material-ui/core';
import Dropzone from '../Dropzone/Dropzone';
import {TextField, OutlinedInput, Box} from '@material-ui/core';
import {newPosti, fetchPostsData, fetchPostsDataByLikes} from '../actions/post.js';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const resource = fetchPostsData();
const resourceLikes = fetchPostsDataByLikes();

function GetPosts(pos, user){
    var got_posts;
    if(pos.pos === 0){
        got_posts = resource.posts.read();
    }else if(pos.pos === 1){
        got_posts = resourceLikes.posts.read();
    }
    return(
        <div className="resumes">

            {got_posts.length === 0 ?(
                <h5 className="posts_empty">No Posts Yet</h5>
            ) :
            (
               
                    <Grid container 
                        p = {1}
                        direction="column"
                        alignItems="center"
                        justify="flex-end">
                            {got_posts.slice(0).reverse().map((item,index)=>{
                                if(item.Username !== pos.user){
                                return (<Grid   style={{margin: 10}}
                                                key={index} item xs = {12}>
                                            <CardComponent 
                                                post= {item}
                                                user = {pos.user}
                                                width = {700}
                                            />
                                        </Grid>)}
                                         
                                })}
                    </Grid>
                        )}

        </div>
    );
    
}
function Explore(props){
    const username = props.app.state.currentUser;
    // props.
    const history = useHistory();
    useEffect(() =>{
        history.push('/Explore');
    }, [history]);
    const user = {
        Username: username
    }
    const [titleToggle, emptyTitle] = React.useState(0);

    const [modalShow, setModalShow] = React.useState(false);
    const [pos, setPos] = React.useState(0);


        const GreenButton_explore = styled(Button)({
            backgroundColor: '#71A89E',
            borderRadius: '5px',
            marginLeft: '50px',
            marginTop: '15px',
            color: "white",
            Height: '48px',
            minWidth: '225px',
            textTransform: 'capitalize',
            "&:hover": {
                backgroundColor: "#009688",
                color: 'white'
            }
        });
        const GreenButton_explore_sort = styled(Button)({
            backgroundColor: '#71A89E',
            borderRadius: '5px',
            marginRight: '50px',
            marginTop: '15px',
            color: "white",
            Height: '48px',
            minWidth: '225px',
            textTransform: 'capitalize',
            float: 'right',
            "&:hover": {
                backgroundColor: "#009688",
                color: 'white'
            }
        });

        function MyVerticallyCenteredModal(props) {
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
        
            const [desc, setDesc] = React.useState('');
            const handleDescChange = (event) => {
                setDesc(event.target.value);
            };

            function postit(){
                if(title === ''){
                    emptyTitle(1);
                    
                }else if(file === ''){
                    console.log("empty pdf");
                }else{
                    setModalShow(false)


                    let data = new FormData()
                    data.append('likes', 0);
                    data.append('Username', user.Username);
                    data.append('title', title);
                    data.append('subtitle', subtitle);
                    data.append('file', file);
                    data.append('fileUrl', file.preview);
                    data.append('date', Date().toLocaleString());
                    data.append('desc', desc);
                    data.append('comments', [])
                    
                    // window.localStorage.setItem('file', file)
                    newPosti(data);

                    window.location.reload(false);
                    window.location.reload(false);

                }

                
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
                    Post Your Resume
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
            
            {/* <NavExplore /> */}
            {/* <div className = 'postResume'>
                <Dropzone />
            </div> */}

            <div className='Title_input'>     

                <OutlinedInput
                    id="outlined-name"
                    name="Title*"
                    value={title}
                    placeholder="Title"
                    onChange={handleTitleChange}
                    variant="outlined"
                    error={titleToggle}
                    />    
               

            </div>
            <div className='Subtitle_input'>
                <Box width={500}>
                    <TextField
                        id="subtitle-textarea"
                        name="Subtitle"
                        value={subtitle}
                        placeholder="Subtitle"
                        onChange={handleSubtitleChange}
                        variant="outlined"
                        fullWidth
                    />
                </Box>

            </div>
            <div className='Desc_input'>
                <Box width={500}>
                    <TextField
                        id="desc-textarea"
                        name="Description"
                        placeholder="Description"
                        onChange={handleDescChange}
                        value={desc}
                        multiline
                        variant="outlined"
                        fullWidth
                    />
                </Box>

            </div>
           <Dropzone onImageDrop={handleFileChange}/>


        </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button color= 'secondary'  onClick={props.onHide}>Close</Button>
                  <Button color= "primary"  onClick={postit}>
                    Post
                  </Button>
                </Modal.Footer>
              </Modal>
            );
          }

    return(
            <div className="feed">
                <NavExplore app = {props.app} log = {props.history}/>
                {/* <Button className='button_post' variant="primary" onClick={() => setModalShow(true)}>
                    Create a Post
                </Button> */}
                <GreenButton_explore variant="contained" onClick={() => setModalShow(true)}>
			        {'create post'}
		        </GreenButton_explore>
                <GreenButton_explore_sort variant="contained" onClick={() => setPos(1)}>
			        {'Sort By Likes'}
		        </GreenButton_explore_sort>
                <GreenButton_explore_sort variant="contained" onClick={() => setPos(0)}>
			        {'Sort By Newest'}
		        </GreenButton_explore_sort>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                {/* <Suspense fallback={<h2>Loading Posts...</h2>}>
                    <GetPosts pos={pos} user={username}/>
                </Suspense> */}
                <Suspense fallback={<h2>Loading Posts...</h2>}>
                    { pos==1 ? <GetPosts pos={1} user={props.app.state.currentUser}/> : null }
                    { pos==0 ? <GetPosts pos={0} user={props.app.state.currentUser}/> : null }
                </Suspense>
                   
                
            </div>
            
        
    )
}
export default Explore;