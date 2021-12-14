import React, { useEffect, useState } from "react";
import axios from "axios";
import { storage } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [post, setPost] = useState(null); // firebase
  const [updatePost, setUpdatePost] = useState("");
  const [updatePic, setUpdatePic] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const state = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    getAllPosts();
    // console.log(url);
  }, []);
  const handleChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setPost(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    console.log("post", post);
    const uploadTask = storage.ref(`image/${post.name}`).put(post);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("image")
          .child(post.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setUrl(url);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  };
  // console.log("post", post);
  const getAllPosts = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getpost`, {
        headers: {
          Authorization: `Bearer ${state.login.token}`,
        },
      });
      console.log(result);
      setPosts(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  // //add new post
  const addNewPost = async () => {
    console.log(desc);
    console.log(url);
    console.log(state.login.token);
    try {
      await axios.post(
        `${BASE_URL}/createpost`,
        {
          img: url,
          desc,
        },
        {
          headers: {
            Authorization: `Bearer ${state.login.token}`,
          },
        }
      );
      // dispatch(addNewTask(result.data));
      setUrl("");
      setDescription("");
      getAllPosts(state.login.token);
    } catch (error) {
      console.log(error);
    }
  };
  // edit task
  const updateTask = async (id) => {
    console.log(state.login.token);
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        {
          pic: updatePic,
          description: updatePost,
        },
        {
          headers: {
            Authorization: `Bearer ${state.login.token}`,
          },
        }
      );
      getAllPosts(state.login.token);
    } catch (error) {
      console.log(error);
    }
    window.location.reload(false);
  };
  // delete post by id
  const deleteTask = async (_id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/getpost/${_id}`, {
        headers: {
          Authorization: `Bearer ${state.users.token}`,
        },
      });
      deleteTask(state.users.token);
    } catch (error) {
      console.log(error);
    }
    window.location.reload(false);
  };
  return (
    <div className="container">
      <br></br>
      <br></br>

      <div className="form">
        <h1 className="heading">ADD POST </h1>
        <progress value={progress} max="100" />
        <br></br>
        <hr />
        <br></br>
        <div className="uplaod">
          <br></br>
          Upload Photo
          <br></br>
          <input type="file" name="post" onChange={handleChange} />
          <button
            className="custom-file-upload"
            onClick={handleUpload}
            style={{ color: "white", fontSize: "15px" }}
          >
            upload
          </button>
          <br></br>
          <br></br>
          Image Description:
          <br></br>
          <img className="RawImg" src={url} />
          <br></br>
          <textarea
            required
            rows="4"
            className="input"
            placeholder="set you description"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="btn" onClick={addNewPost}>
            Add
          </button>
          <br></br>
          <br></br>
          <div className="content">
            {posts.length &&
              posts.map((item) => (
                <div key={item._id}>
                  <div className="img">
                    <img src={item.pic} alt="firebase" />
                  </div>
                  <br></br>
                  <br></br>
                  <div className="dec">
                    <p>{item.description}</p>
                  </div>
                  <br></br>
                  <br></br>
                  <button className="btn" onClick={() => updateTask(item._id)}>
                    Update
                  </button>
                  <button className="btn" onClick={() => deleteTask(item._id)}>
                    Delete
                  </button>
                  <button className="btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      fill="currentColor"
                      class="bi bi-hand-thumbs-up"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                    </svg>
                  </button>
                  {/* <button
                      className="btn"
                      onClick={() => navigate(`/post/${item._id}`)}
                    >
                      {" "}
                      view{" "}
                    </button> */}
                  <br></br>
                  <br></br>
                  <br></br>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;

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
