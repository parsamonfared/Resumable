import './ResumeView.css'
import React, {Suspense} from 'react'
import { useHistory } from "react-router"
import {NavExplore} from "../NavBar/NavBar"
import { Container, List } from "semantic-ui-react";
import { Comment, Form, Button as Bt, Header, TextArea } from 'semantic-ui-react'
import Avatar from '@material-ui/core/Avatar';
import {newComment, fetchCommentsData, fetchPostsData} from '../actions/post.js';
import {TextField, OutlinedInput, Box, Button} from '@material-ui/core';
import { Link } from 'react-router-dom';
import PdfDisplay from '../PdfDisplay/PdfDisplay'
import TextFieldInput from '../TextFieldInput';
import ENV from './../config.js'
const API_HOST = ENV.api_host;
var res;
const App = ({ children}) => (
    <Container style={{ margin: 20 }}>
      {children}
    </Container>
  );

  let post = null;
function GetComments(){
      
    const cvc = res.posts.read();

         return(
           <div>
              {false ?(
                <h5 className="posts_empty">No Comments Yet</h5>
            ) :(
              cvc.slice(0).reverse().map((i,index)=>{
                    if(i._id == post._id)
                      if(i.comments.length>0){
                        return (i.comments.map((item,index)=>{
                          return <Comment key={index}>
                              <Comment.Avatar src={<Avatar aria-label="user" >
                                                  {item.Username.charAt(0)}
                                                  </Avatar>} />
                              <Comment.Content>
                              <Comment.Author as='a'>{item.Username}</Comment.Author>
                              <Comment.Metadata>
                                  <div>{item.time}</div>
                              </Comment.Metadata>

                              {item.type == "HIGHLIGHT" ? 
                                (<Comment.Text>
                                  <Link
                                    to={{
                                      pathname: `/highlight-feedback-view/${item._id}`,
                                      state: { 
                                        user: item.Username, 
                                        postId: post._id, 
                                        post: post,
                                        highlightId: item._id
                                      }
                                    }}
                                  >
                                    <Button>{`Click to view feedback`}</Button>
                                  </Link>
                                </Comment.Text>) : 
                                (<Comment.Text>
                                  {item.text}
                                </Comment.Text>)}

                              <Comment.Actions>
                              <Comment.Action>Reply</Comment.Action>
                              </Comment.Actions>
                              </Comment.Content>
                          </Comment> 
                      }))}
                      else{
                        <h5 className="posts_empty">No Comments Yet</h5>
                      }
                        
                })
              
            )}
        </div>
          )

}


function ResumeView(props) {
    res = fetchPostsData();
    const username = props.app.state.currentUser;
    let ct = ""
    post = props.location.state.data.post
    const [cm, setCm] = React.useState('');
    const handleCmChange = (e) => {
      setCm(e);
    };
    const handleCommentChange = (comment) => {
      ct = comment;
    };
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);


    const CommentSection = () => (
        
        <Comment.Group>

          <Header as='h3' dividing>
            Comments
          </Header>

          <Suspense fallback={<h2>Loading Comments...</h2>}>
            <GetComments/>
          </Suspense>

        </Comment.Group>
      )
    return (
        <div>
         <NavExplore app = {props.app} log = {props.history}/>
            <div>
              <div id="resume-image">
                <h1 id="resume-header"> {post.title}</h1>
                <div className="border-box">
                    <p className="pp">{post.desc}</p>
                </div>
                <div className = "border-box">
                  <PdfDisplay url={`${API_HOST}/files/${post.file}`} width={0.5} ></PdfDisplay>
                </div>
                
              </div>


              

              <div className = "feedback-box">
                  <App>
                    <CommentSection/>
                  </App>
                </div>
                <div className="feedback-add-section">
                  <div className="feedback-add-buttons">
                  <Form onSubmit={(e)=>{

                    if(ct !=''){
                      let nComment = {
                          Username: username,
                          text: ct,
                          time: Date().toLocaleString(),
                          type: "TEXT"
                      };
                      newComment(post._id, nComment)
                      window.location.reload(false);  
                    }
                    }} reply>
            
                      <Bt content='Add Reply'  secondary />
                      <Link
                        to={{
                          pathname: `/highlight-feedback/${post._id}`,
                          state: { user: username, postId: post._id, post: post }
                        }}
                      >
                      <Bt color='teal'> Add Highlight </Bt>

                      </Link>
                    </Form>
                    </div>

                  <TextFieldInput onCommentChange={handleCommentChange}/>
              </div>




             


            </div>

        </div>
    )
}

export default ResumeView
