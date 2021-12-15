
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import './style.css'

const Post = () => {

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const params = useParams();
  const [data, setData] = useState([]);
  const [User, setUser] = useState("");
  const [likes, setlikes] = useState(0);
  const [currentUserLiked, setcurrentUserLiked] = useState(false);

  const getPosts = async () => {
    try {
      await axios
        .get(`${BASE_URL}/getpost`)
        .then((result) => {
          console.log(result.data);
          // setlikes(result.data[0].like.length);
          setData(result.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      if (User) {
        const result = await axios.post(
          `${BASE_URL}/createcomment/${params.id}`,
          {
            comment: e.target.comment.value,
            username: User,
          },
          {
            withCredentials: true,
          }
        );
        getComments();
      }
    } catch (err) {
      console.error(err);
    }
    e.target.comment.value = "";
  };

  const [noComment, setNoComment] = useState(0);
  const [commments, setcommments] = useState([]);

  const getComments = async () => {
    try {
      const result = await axios.post(
        `${BASE_URL}/allcomment`,
        {
          post: params.id,
        },
 
      );
      setcommments(result.data);
      setNoComment(result.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  const DeleteComment = async (id) => {
    try {
      const result = await axios.delete(`${BASE_URL}/deletecomment/${id}`, {
        withCredentials: true,
      });
      console.log(result.data);
      getComments();
    } catch (err) {
      console.error(err);
    }
  };

  const likePost = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/addLike/${params.id}`, {
        withCredentials: true,
      });
      console.log(result.data.result);
      if(result.data.result=='removeLike'){
          setcurrentUserLiked(false)
      }else if(result.data.result=='newLike'){
        setcurrentUserLiked(true)
      }
      getPosts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(async () => {
    const username = await axios.get(`${BASE_URL}/alluser`, {
      withCredentials: true,
    });
    setUser(username.data.user._id);
    getPosts();
    getComments();
   
  }, []);

  return (
    <div>
  
        <div className="tweet">
          <h1>{data[0]?.title}</h1>
          <img
            src={data[0]?.img}
            alt=""
            width="400"
            height="400"
          />
          <p>{data[0]?.desc}</p>
          <h4>
            Like:
            {currentUserLiked ? (
              <span id="heart" onClick={likePost}>
                🤍
              </span>
            ) : (
              <span onClick={likePost}>🤍</span>
            )}
            | {likes}
          </h4>
        </div>

        <form className="comments_form" onSubmit={sendComment}>
          <div className="commentHead">
            <h3>New Comment</h3>
            <button type="submit">Submit</button>
          </div>
          <div className="commentTail">
            <textarea
              name="comment"
              placeholder="write tweet"
              required
           
            ></textarea>
          </div>
          <div className="numComment">
            <h3>{noComment} Comments</h3>
          </div>
          {commments
            ?.map((comment, index) => {
              return (
                <div className="realComment" key={index}>
                  <hr />
                  <div className='postimgage'>
                  <img 
            src="https://th.bing.com/th/id/OIP.UDT_R3C2jSNNIFHF-oS6-wHaFQ?pid=ImgDet&w=832&h=590&rs=1"
            height="170px"  alt="no img" />
                    <div className="comment">
                      <h3>{comment.user.username}</h3>
                      <p>{comment.comment}</p>
                    
                    </div>
                    {console.log(comment)}
                    {comment.user._id == username ? (
                      <p
                        className="del"
                        onClick={() => DeleteComment(comment._id)}
                      >
                        remove
                      </p>
                    ) : (
                      <></>
                    )}
                    {comment.user._id == username ? (
                      <p
                        className="del"
                        onClick={() => UpdateComment(comment._id)}
                      >
                        edit
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            })
            .reverse()}
        </form>
      </div>
 
  );
};

export default Post;


























  /*
  return (
    <div className="container">
  
      <div className="form">
        <h1 className="heading">send</h1>
        <progress value={progress} max="100" />
        <br></br>
        <hr />
        <br></br>
        <div className="uplaod">
          <br></br>
          Upload
          <br></br>
          <input type="file" name="post" onChange={handleChange} />
          <button
            className="upload"
            onClick={handleUpload} > upload
          </button>
        <br />
          Image Description:
          <br></br>
          <img className="RawImg" src={url} />
          <br />
          <textarea
            required
            rows="4"
            className="input"
            placeholder="what you send"
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className="btn" onClick={addNewPost}>
            Add
          </button>
          <br />
          <div className="content">
            {
              posts.map((item) => (
                <div key={item._id}>
                  <div className="img">
                    <img src={item.img} alt="firebase" />
                  </div>
                  <br></br>
                  <br></br>
                  <div className="dec">
                    <p>{item.desc}</p>
                  </div>
                  <br></br>
                  <br></br>
                  <button className="btn" onClick={() => updatepost(item._id)}>
                    Update
                  </button>
                  <button className="btn" onClick={() => deletepost(item._id)}>
                    Delete
                  </button>
                  <br />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;

*/

/* import React, { useEffect, useState } from "react";
import "./style.css";
//import { storage } from "./../firebase";
import FileBase from "react-file-base64"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Post=() =>{
 
 
 const [post,setPost] =useState();
 
 /* const [url, setUrl] = useState(null);
  const [image, setImage] = useState();

  const handleChange = (e) => {
    console.log(e);
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (image) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    ); 
/
    return (
      <>
      <div className="post">
        <img
          className="postimgage"
          src="https://th.bing.com/th/id/OIP.UDT_R3C2jSNNIFHF-oS6-wHaFQ?pid=ImgDet&w=832&h=590&rs=1"
          height="170px"
          alt="no img"
        />
        <form className="writepost">
          <div className="postgroup">
            <label></label>
            <input
              type="file"
              className="fileinput"
              style={{ display: "none" }}
            />
            <input
              type="text"
              placeholder="title"
              className="textarea1"
              autoFocus={true}
            />

            <div className="postgroup">
              <textarea
                placeholder="tweet here "
                type="text"
                className="textarea"
              ></textarea>
            
            <FileBase
          type="file"
          multiple={false}
          onDone={({ base64, base64: string }) =>
            setPost({ ...post, img: base64 })
          }
        />
              <button className="button">send tweet</button>
            </div>
          </div>
        </form>
      </div>
      </>
    );
  };


export default Post;

const Post = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [post, setPost] = useState([]);
  

  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();


  useEffect(() => {
    getallpost ();
  }, []);


  const signOut = () => {
    dispatch(logout({ token: "" }));
  };


  const  getallpost = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getpost`, {
        headers: {
            Authorization: `Bearer ${state.signIn.token}`,
        },
      });

      setPost(result.data);
    } catch (error) {
      console.log(error);
    }
  };

/////create post 
  const createpost = async () => {
    try {
        const result = await axios.post( `${BASE_URL}/createpost`, { 
            img:e.target.value.img,
            desc:e.target.value.desc,
            user:user 
        },
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );
      getallpost(result.data);
    } catch (error) {
      console.log(error);
    }

    const deletepost = (id) => {
      try {
        axios
          .delete(`${BASE_URL}/deletepost/${id}`, 
          {
            headers: {
              Authorization: `Bearer ${state.signIn.token}`,
            },
          });


       

  return (
   

     <div className ="posts">
       
      {post.map((item) => (
          <h2 key={item._id}>{item.desc}</h2>
          <img src={item.img}
          height="130px" width="150" alt="no img" />
          
        ))}
      <button onClick={createpost}>send tweet</button>
      <br />
      <button onClick={ deletepost }>X</button>
      <br />
      <button onClick={signOut}>logOut</button>
      <br />
    </div>
  );
};



export default Post;




/*

import React from 'react'
import './style.css'
import {storage} from './../firebase'
function Post () {

    return (
   
<div className='post'>
<img className='postimgage'
            src="https://th.bing.com/th/id/OIP.UDT_R3C2jSNNIFHF-oS6-wHaFQ?pid=ImgDet&w=832&h=590&rs=1"
            height="170px"  alt="no img" />
<form className='writepost'>
<div className='postgroup'>
<label>

</label>
<input type='file' className='fileinput' style={{display:'none'}}/>
<input type='text' placeholder='title' className='textarea1' autoFocus={true}/>

<div className='postgroup'>
<textarea placeholder='tweet here ' type='text' className='textarea'>

</textarea>
<br></br>



<button className='button'>send tweet</button>

</div>
</div>
</form>
</div>)
}

export default  Post 
*/
