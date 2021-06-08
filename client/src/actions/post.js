import ENV from './../config.js'
const API_HOST = ENV.api_host;

export function fetchPostsData() {
    let postsPromise = fetchPosts();
    return {
      posts: wrapPromise(postsPromise)
    };
}
export function fetchPostsDataByLikes() {
    let postsPromise = fetchPostsByLikes();
    return {
      posts: wrapPromise(postsPromise)
    };
}


export function fetchCommentsData(id) {
    
    let commentPromise = fetchComments(id);
    return {
      comments: wrapPromise(commentPromise)
    };
  }
function wrapPromise(promise) {
    let status = "pending";
    let result;
    let suspender = promise.then(
      r => {
        
        status = "success";
        result = r;
      },
      e => {
        status = "error";
        result = e;
      }
    );
    return {
      read() {
        if (status === "pending") {
          throw suspender;
        } else if (status === "error") {
          throw result;
        } else if (status === "success") {
          return result;
        }
      }
    };
  }
  

function fetchPosts() {
  const request = `${API_HOST}/getPost`

  return new Promise(resolve => {
      resolve(fetch(request)
      .then(res => {
          if (res.status === 200) {
              return res.json();
          } else {
              alert("Could not get posts");
          }
      })
      .then(json => {
          // the resolved promise with the JSON body
          // post = json[0];
          
          return json
      })
      .catch(error => {
          console.log(error);
      }));
  });
}
function fetchPostsByLikes() {
      const request = `${API_HOST}/getPostByLikes`

      return new Promise(resolve => {
          resolve(fetch(request)
          .then(res => {
              if (res.status === 200) {
                  return res.json();
              } else {
                  alert("Could not get posts");
              }
          })
          .then(json => {
              // the resolved promise with the JSON body
              // post = json[0];
              
              return json
          })
          .catch(error => {
              console.log(error);
          }));
      });
    }

export const newPosti = (data) => {
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/addPost`, {
        method: "POST",
        body: data,
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return;
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const newComment = (postid, comment) => {
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/addPost/${postid}`, {
        method: "post",
        body: JSON.stringify(comment),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return;
            }
        })
        .catch(error => {
            console.log(error);
        });
};


function fetchComments(id) {
      const request = `${API_HOST}/getPost/${id}`
      return new Promise(resolve => {
          resolve(fetch(request)
          .then(res => {
              if (res.status === 200) {
                  return res.json();
              } else {
                  alert("Could not get comments");
              }
          })
          .then(json => {
              // the resolved promise with the JSON body
              // post = json[0];
              return json
          })
          .catch(error => {
              console.log(error);
          }));
      });
    }

export const fetchHighlights = (pid, hid) => {

    const request = `${API_HOST}/highlights/${pid}/${hid}`;
    
    return new Promise(resolve => {
        resolve(fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res;
            } else {
                alert("Could not get comments");
            }
        })
        .then(json => {
            return json
        })
        .catch(error => {
            console.log(error);
        }));
    });
}
        
export const fetchPostsByUsername = (posts) => {

    const request = `${API_HOST}/getPostByUsername`
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get posts");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            // post = json[0];
            posts = json;
            return json;
        })
        .catch(error => {
            console.log(error);
        });
  }
  
export const updateLikes = (like, postId) => {
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/updatePost/${postId}/${like}`, {
        method: "PATCH"
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return;
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const deletePost = (postId)=>{
    const request = new Request(`${API_HOST}/deletePost/${postId}`, {
        method: "DELETE"
    });
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return;
            }
        })
        .catch(error => {
            console.log(error);
    });
}


