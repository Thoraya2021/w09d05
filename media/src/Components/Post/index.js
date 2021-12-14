import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Post = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [post, setPost] = useState([]);


  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getallpost ();
  }, []);

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
  };

  return (
    <>
     
    </>
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