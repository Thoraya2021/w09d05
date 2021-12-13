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