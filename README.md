## Link to the website: https://theresumable.herokuapp.com/

## Libraries that we used (Client Side):
- devexpress
- material-ui
- semantic-ui
- react-pdf
- bootstrap
- pdfjs-dist
- react-bootstrap
- react-dropzone
- react-router-dom
- react-toastify
- syncfusion
- testing-library 
- axioms 
- chroma-js
- cors
- mongoose

## Libraries that we used (Server Side):
- bcryptjs
- connect-mongo
- cors
- express"
- express-session
- gridfs-stream
- mongoose
- multer
- multer-gridfs-storage
- validator

## For best user experience please have the window in fullscreen

## Login Credentials

### For Admin:
**Username:** admin <br />
**Password:** admin

### For User:
**Username:** user <br />
**Password:** user

### Updated/New Features
Post can be sorted by likes and most recent 
Users can now update their personal information
Admins can get to the admin page from the other pages by clicking the Overview button in the Navigation bar
Admins can delete posts by clicking the trash icon that is located on every post in the Explore page.  
Commenting on posts on Resume view page is now activated
Users can now see their latest posted resume on their profile page



## Instructions
Before running any commands, proceed to the folder ./team27 for the server and ./team27/client

First type npm install in the console to get all the libraries installed.

To start the web application type npm start in the console. The website should starts on a landing page


### Step 1:
### User View:
**Sign Up**

If the user does not have an account they can sign up by clicking the sign up button. This will redirect the user to sign up page where they have to fill out the required text box and click the sign up button. Once a user clicks on the sign up button a new account will be created based on the information provided and will redirect the user to the Explore page.

**Login**

If a user has an account they can click the login button that is located at top right of the page. This will redirect the user to the login page where they can login with their correct credentials. Once the login button is clicked with the correct credentials it will redirect the user to the Explore page.


### Admin View:
**Login**

An admin will be able to login by clicking the login button that is located at top right of the page. This will redirect them to the login page where they can login with correct admin credentials (please use the admin credentials, located at the top of this page,  that are provided to login in as an admin). Once an admin login with correct credentials, the website will redirect them to the Admin page.


### Step 2:
**Admin Page**
Since we don’t have like an all around finished website for example like facebook, the admin functionalities are somewhat limited. With that being said, when the admin logs in from the login page using the credentials username: admin and password: admin, they would be taken to the admin overview page. The admin overview consists of information such as the total number of feedbacks, total number of posts and also the total number of users. There also is a list of all of the users who currently have accounts on the website. The main functionality of the admin is that the admin has the ability to delete posts on the explore page. So if there is a post which the admin thinks is inappropriate, they can just click on the trash can icon on the top right corner of the post in order to delete it. Also only admin has access to the admin overview page and no other user can access that page. 

### User/Admin View:

### Step 3:
**Explore (For user)**

A User can create a new post and upload your resume as follows : 

1. Click create post button
2. Input a title for the new post. NOTE: This is required, if this is missing, the user will not be able to make a new post. 
3. Input a subtitle for the new post.
4. Input a description for the new post
5. Click on the box that states “drag ‘n’ drop your Resume pdf in here or click to select it” to upload a resume. A user can also drag and drop a pdf into the box to upload a resume. NOTE: This is required, if this is missing, the user will not be able to make a new post. 
6. Then press the post button to create a new post.

**Note**: The user will not be able to view the new post created on the Explore page. Users can only view/comment on other users’ posts.

A user can also browse posts and checkout a specific post by clicking a post. If a user clicks a post it will redirect them to the Resume View, where they can view the resume and any comments left by other users. Users can add comments. Moreover, a user can easily return to the Explore page by clicking the Home button that is located in the Navigation bar (which is located at the top of the page).

Furthermore, a user can also sort the posts by likes and by recent posts. 

Lastly, users can log out by clicking the logout button that is located in the Navigation bar. (which is located at the top of the page).

**Explore (For admin)**

An admin can do everything a user can do. Additionally, admins can redirect to the Admin page by clicking on the Overview button that is located in the Navigation bar (which is located at the top of the page).





### Step 4:
**Resume View**

If a user clicks on a post it will redirect them to the Resume View page.In our resume view page, the user sees the full resume, a description of what the owner of the resume is looking for and the comment section where the user can view other peoples comments on the post and add their own comments if they wish to do so. To leave a comment, the user can type whatever they want in the textbox provided under the comment section and then press “Add reply” which then would add their comment to the top of the comment section. The user can also click on the “Add Highlight” button which would take them to the Highlight Feedback View. For a description on the Highlight Feedback View page, look under step 5.



### Step 5:
**Profile**

The user can view their profile by clicking on the my profile button in the explore page. When the user is in the profile page, they can first see their personal information such as their first name, last name, date of birth ect. They can also view some of the posts that they have posted in the past. They can press on each post just like they would on the explore page and would take them to the comment section of the post. Another component of this page is that it will show the full version of the resume which was part of the user’s latest post on the right side of the viewport. The users can also update most of their information by clicking on the update info button which would open a pop up where the user can then fill out the section of the info that they would like to change and then by clicking update. Note: when users make an account in the sign up page, they are not required to enter a date of birth and program so at the beginning, those fields would appear as empty until they update their info by following the steps below: 
1) Press on the “Update Info” button under the information section.
2) fill out only the sections that you want changed
3) Then click on update.
This would then refresh the page and update the user’s info both the website and the database.



### Step 6:
### User/Admin View:
**Highlight Feedback View**

Upon entry to the highlight feedback page you will see two sections. The section on the left is a canvas which displays the file that can be highlighted. The section on the right will display the feedback items for the corresponding highlights.

Use the mouse cursor to select a line of text on the file to provide feedback for. After making the highlight selection a window with a textbox will pop up. Please enter your feedback corresponding to the highlight in the textbox and click submit. If no text is entered and the user clicks out of the popup, the feedback will be cancelled. After clicking add, note that there is now a highlight over the text selected in the file. A corresponding feedback item is placed in the "Feedback Items'' section. The feedback item will contain a title (feedback entered in the textbox), and description (highlighted text). Users can make multiple highlights following the same steps.

Clicking a feedback item will focus the canvas on the corresponding highlight and make the colour of the highlight green. Moving the mouse out of the feedback item will unselect the selected highlight and change the colour back to yellow. Users can easily find specific feedback by clicking through the feedback items.
A user should click the submit button located in the top right after they are done making highlights on the page. A user can click the back button to return to the Resumeview page. 


## Server Routes

### /checkSession
Description : Check whether the user is login by comparing the session details (i.e. whether userID is the same)
Type: GET 
Response:
If the user is logged in a JSON with currentUser set to the username of the account that is logged in will be sent
For example: {currentUser: admin} (200 status code)
Otherwise:
404 response

### /loginUser
- **Description** : Check whether the credentials inputted by the user is correct. If so, returns a JSON with currentUser equal to the username of the account that is login and success as true. If the credentials are incorrect returns a JSON with the currentUser as undefined and success as false
- **Type**: POST
- **Body**:
    - {Username: the username inputted by the user
       Password: the password inputted by the user}
    - **Example**: {Username: admin,  Password: admin}
- **Response**:
    - Example: if credentials are Username: admin, Password: admin
        - If the user is logged in successfully:
            - {currentUser: admin, success: true} (200 status code)
        - If the credentials are incorrect:
            - {currentUser: undefined, success: false} (200 status code) 

### /logout
- **Description**: Logout the user and destroys the session that is stored in the database
- **Type**: GET
- **Response**: If the user is successfully logged out sends 200. Otherwise sends 500.

### /addUser
- **Description** : Add a new user to the database.
- **Type**: POST
- **Body**:
    - {Username: the username inputted by the user
        firstName: First name that is inputted by the user
        lastName: Last name that is inputted by the user
        Password: the password inputted by the user}
    - **Example**: {Username: Jack123,  firstName: Jack, lastName: Nicholson, Password: jack444}
- **Response**: 
    - If the new user was successfully added, then a JSON with Username set to the username of the newly created account, and userFound set to true will be sent. 
        - **Example**: If the account, {Username: Jack123,  firstName: Jack, lastName: Nicholson, Password: jack444}, was successfully created then the response would be:
            - {Username: Jack123, userFound: true}
    - If the account was not successfully created (i.e. the account already existed), then a JSON with  Username set to null and the userFound set to false will be sent
        - **Example**:  If the account, {Username: Jack123,  firstName: Jack, lastName: Nicholson, Password: jack444}, was not successfully created then the response would be:
            - {Username: undefined, userFound: false}
    - If there is a Mongodb server error, 500 status code will be sent
    - If the request is bad then 400 status code will be sent 


### /addPost
- **Description** : Add a new post to the database.
- **Type**: POST
- **Body**:
    - {Username: the username inputted by the user
    title: Title of the post inputted by the user
    subtitle:: Subtitle of inputted by the user
    date: the inputted by the user
    file:  the pdf file object
    fileUrl: the url of the pdf file object
    desc: description of the post
    Likes: number of likes
    comments: comments under a post (empty list when we just create it)}
    - **Example**: {Username: user,  title: New title, subtitle: New subtitle, date: current data, file: pdf file, fileUrl: url of the preview of pdf file, description: “this is my desc”, comments: []}
- **Response**: 
    - If there is a Mongodb server error, 500 status code will be sent
    - If the request is bad then 400 status code will be sent 
    - If the request is successful then 200 status code will be sent 




### /addPost/:id
- **Description** : Add a new comment to a post by id in the database.
- **Type**: POST
- **Body**:
    - {comment: user comment on post}
    - **Example**: {comment: {Username: “user”, text: “this is my comment”, time: the date of comment, type: “TEXT”}}
- **Response**: 
    - If there is a Mongodb server error, 500 status code will be sent
    - If the request is bad then 400 status code will be sent 
    - If the request is successful then 200 status code will be sent 


### /getPost
- **Description** : Gets all of the Posts from the database.
- **Type**: GET
- **Body**:
- **Response**: list of all of the posts in a json format
    - **Example**: {
        likes: '0',
        Username: 'user',
        title: 'resume',
        subtitle: 'resume',
        fileUrl: 'blob:http://localhost:5000/91e3b158-630
        date: 'Fri Apr 09 2021 18:19:03 GMT-0400 (Eastern
        desc: 'resume',
        comments: ''
        }
### /getPostByLikes

- **Description** : Gets all of the Posts sorted by number of likes from the database.
- **Type**: GET
- **Body**:
- **Response**: list of all of the posts sorted by number of likes in a json format
    - **Example**: {
        likes: '0',
        Username: 'user',
        title: 'resume',
        subtitle: 'resume',
        fileUrl: 'blob:http://localhost:5000/91e3b158-630
        date: 'Fri Apr 09 2021 18:19:03 GMT-0400 (Eastern
        desc: 'resume',
        comments: ''
    }

### /getUser
- **Description** : Get all of the users in the database.
- **Type**: GET
- **Body**:
- **Response**: list of all of the users in a json format
    - **Example**: {
        id: 6068f6e62b019d37f898628c
        dateOfBirth:""
        Program:""
        Username:"test"
                    firstName:"arshia"
            lastName:"gharai"
        password:"$2a$05$.N0odqWhETS/VuChXWsyxOFa3pfmF1RYtDB0G/o5J6uRgqiuMKvf2"
        }

### /files/:id
- **Description** : this server route is used to retrieve .pdf file by id from the database using GridFS to display as preview throughout the application  
- **Type**: GET
- **Response**:
    - If the file does not exist a 404 status code will be sent 
    - If the file is found, the byte representation of the pdf is sent


### /updatePost/:id/:like
- **Description** : this server route is used to update number of likes on a post when post like button gets toggled
- **Type**: PUT
- **Body**
- **Response**: not response body just a response code
    - If there is a Mongodb server error, 500 status code will be sent
    - If the request is successful then 200 status code will be sent 
### /deletePost/:postid
- **Description** : this server route is used to delete a post, which is used by admin on explore page to delete a post.
- **Type**: PUT
- **Body**
- **Response**: not response body just a response code
    - If there is a Mongodb server error, 500 status code will be sent
    - If the request is successful then 200 status code will be sent 

### /updateInfo
- **Description** : this server route is used in the profile page when the user is trying to change/update their information.
- **Type**: PUT
- **Body**: {
  	    dateOfBirth:"september 12, 2001"
   	    Program:"computer science"
  	    Username:"arshia.gharai"
                   firstName:"arshia"
 	    lastName:"gharai"
  	    }
- **Response**: not response body just a response code
    - If there is a Mongodb server error, 500 status code will be sent
    - If the request is successful then 200 status code will be sent 
    - If the user is not found, then 400 status code will be sent


### /highlights/:pid/:hid

- **Description** : this server route is used to obtain the highlight feedback with id (hid) provided on a post with id (pid), to show in the highlight-feedback-view page.
- **Type**: GET
- **Response**: not response body just a response code
    - If there is a Mongodb server error, 500 status code will be sent
    - If the post is not found, 404 status code will be sent
    - If the request is successful then 200 status code will be sent along with the highlight feedback.
    - Response Body:
"highlight":{"key":{"$numberInt":"2"},"x":{"$numberDouble":"971.89453125"},"y":{"$numberDouble":"1075.44921875"},"h":{"$numberDouble":"23.75"},"w":{"$numberDouble":"83.75"}}},{"content":{"text":"TARGET CORPORATION","image":null},"title":{"text":"target !"},"highlight":{"key":{"$numberInt":"1"},"x":{"$numberDouble":"161.953125"},"y":{"$numberDouble":"1267.3828125"},"h":{"$numberDouble":"23.75"},"w":{"$numberDouble":"232.34375"}}},{"content"

### /*
- **Description** : Used to check if the URL is valid url
- **Type**: GET 
- **Response**:
    - If the URL is valid then index.html is sent.
    - Otherwise:
        - 404 response

