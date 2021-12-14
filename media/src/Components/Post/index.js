
import React, { useEffect, useState } from "react";
import axios from "axios";
import { storage } from "../firebase";
import { useSelector } from "react-redux";

const Post = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null); 
  const [updatePost, setUpdatePost] = useState("");
  const [updatePic, setUpdatePic] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [progress, setProgress] = useState(0);
  const state = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    getAllPosts();
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
      setUrl("");
      setDesc("");
      getAllPosts(state.login.token);
    } catch (error) {
      console.log(error);
    }
  };
  const updatepost = async (id) => {
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
  const deletepost = async (_id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/getpost/${_id}`, {
        headers: {
          Authorization: `Bearer ${state.login.token}`,
        },
      });
      deletepost(state.users.token);
    } catch (error) {
      console.log(error);
    }
    window.location.reload(false);
  };
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
