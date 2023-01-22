import React from 'react'
import ReactPlayer from 'react-player'
import { useState } from 'react';

export const Upload = ({cor}) => {
  // on change event 
  const [youtubeVideo, setYouTubeVideo] = useState("");
  // submit event 
  const [youtubeUrl, setYouTubeUrl] = useState("");
  const handleYouTubeChange = (e) => {
    setYouTubeVideo(e.target.value);
  }
  const handleYouTubeSubmit = (e) => {
    e.preventDefault();
    const youtubeRegex =/^(http(s)??\:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+/
    if(youtubeRegex.test(youtubeVideo)){
      setYouTubeUrl(youtubeVideo);
      setYoutubeError('');

    }else{
      setYoutubeError('invalid Url');
    }
  }

  // const hamada = localStorage.getItem("video")
  // console.log(hamada);
  const [YoutubeError, setYoutubeError] = useState('');

  return (
    <div className='wrapper'>
      <form className='form-group form' onSubmit={handleYouTubeSubmit}>
        <input type='text' className='form-control' placeholder="watch video" required onChange={handleYouTubeChange} />
        <button type='submit' className='btn btn-success btn-md'>
          Upload New Video
        </button>
      </form>
      {<div className='error-msg'>{YoutubeError}</div>}
      <div className='youtube-box'>
        <ReactPlayer url={youtubeUrl} className='video' controls  />

      </div>
    </div >
  )


}
export default Upload