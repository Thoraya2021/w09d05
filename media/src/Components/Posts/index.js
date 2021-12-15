import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Posts = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [username, setUser] = useState(false);
  const [error, seterror] = useState(false);
  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    try {
      axios .get(`${BASE_URL}/getpost`)
        .then((result) => {
            console.log(result.data);
            setPosts(result.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const DeletePost = (id) => {
    try {
      axios
        .delete(`${BASE_URL}/deletepost/${id}`)
        .then(() => {
          getPosts();
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
   
    getPosts();
  }, []);

  const [addError, setAddError] = useState("");
  const newPost = async (e) => {
    try {
      e.preventDefault();
      if (username) {
        const result = await axios.post(
          `${BASE_URL}/getpost`,
          {
            desc: e.target.desc.value,
            img: e.target.img.value,
            user:username,
          },
          { withCredentials: true }
        );
        console.log(result.data);
        if (result.data.error) {
          setAddError(result.data.error);
        } else {
          e.target.desc.value = "";
          e.target.img.value = "";
         
          getPosts();
        }
      } else {
        console.log("login" );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [add, setAdd] = useState(false);
  return (

      <div className="posts">
        <div className="tweet">
          <h1>Tweet`s</h1>

          {!error && add ? (
            <form onSubmit={newPost} className="newtweet">
              <p>New Tweet`s:</p>
              <div>
                <p>Title: </p>
                <input className=" textarea1 " type="text" name="title" />
              </div>
              <div>
                <p>Description: </p>
                <textarea placeholder='tweet here ' type='text' className='textarea1'></textarea>
              </div>
              <div>
                <p>Imgage: </p>
                <input className=" textarea1 " type="text" name="img" />
              </div>
              {addError}
              <div>
                <button className="button" type="submit">Add</button>
                <button className="button" onClick={() => setAdd(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            <button className="button" onClick={() => setAdd(true)}>Send Tweet</button>
          )}
          {error}
          {console.log(error)}
       
          <div className="posts">
            {posts
              ?.map((item) => {
                return (
                  <div key={item._id} className="post">
                    <div onClick={() => navigate(`/post/${item._id}`)} className="pointor">
                      <img
                        src={item.img}
                        wdith="150"
                        height="150"
                        alt=""
                      />
                      <h2 style={{ display: "inline" }}>{item.title}</h2>
                    </div>
                    <div className="flex">
                      <p>created at {item.createdAt.slice(0, 10)}</p>
                      {item.user?._id == username? (
                        <p className="del" onClick={() => DeletePost(item._id)}>
                          remove
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>

                    <br />
                  </div>
                );
              })
              .reverse()}
          </div>
          <div>
            <button className="button"
              onClick={() => {
                navigate("/");
              }}
            >
              Back
            </button>
            {console.log(error)}
          </div>
        </div>
      </div>
    
  );
};

export default Posts;










/*import React from "react";
//import React, {useEffect, useState} from 'react';
import './style.css';
import Post from './../Post'

const Posts =()=> {
  return (
    <div className="posts">
      

<h1>Tweet`s</h1>

<Post/>








    </div>
  );
}

export default Posts;

*/