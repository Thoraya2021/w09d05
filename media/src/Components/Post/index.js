import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import {useDispatch, useSelector } from "react-redux";

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