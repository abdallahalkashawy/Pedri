import React from 'react'
import { Col, Row } from "react-bootstrap";
import { Link} from 'react-router-dom'
import Axios from 'axios'
import Post from './Post';
import Upload from './Upload';
import {FaStar} from 'react-icons/fa'
import { useState } from "react";
import Video from './Video';
const CourseDetails = (courses,cor) => {  
    // const [vlink,setVlink]= useState('');
    const [rating ,setRating] = useState(0);
    const [ratingi ,setRatingi] = useState(0);

    // const [showForm, setShowForm] = useState(false);
    // const [review, setReview] = useState('')
    const Uploadvideo =  () =>{
        const url ='http://localhost:3000/upload-video-into-course/:id'
        Axios.put(url,courses)
        .then((res)  => {
          console.log(res);
        //   setVlink(res.data.Video_link);
        //   console.log(res.data.Video_link);
        })
        .catch((err) => console.log(err))
      } 
      const handleRating = (newRating) => {
        setRating(newRating);
      }
      const handleRatingi = (newRatingi) => {
        setRatingi(newRatingi);
      }
      const handleSubmit = async () => {
        try {
          await Axios.post('http://localhost:3000/rate-course', { rating });
          alert('Rating submitted!');
        } catch (error) {
          console.error(error);
        }
      };
      const handleSubmiti = async () => {
        try {
          await Axios.post('http://localhost:3000/rate-Instructor', { ratingi });
          alert('Rating instructor submitted!');
        } catch (error) {
          console.error(error);
        }
      };
   return(
    
    <div>
    <Row className="justify-content-center">
        <Col
            md="10"
            xs="12"
            sm="12"
            className="mt-2 d-flex justify-content-center ">
            <Link to="/">
                <button
                    style={{ backgroundColor: "#b45b35", border: "none" }}
                    className="btn btn-primary mx-2">
                    Back To homepage
                </button>
            </Link>
            <Link to={`${cor.Video_link}`}>
            <a href={courses.Video_link} >
                <button
                    style={{ backgroundColor: "#b45b35", border: "none" }}
                    className="btn btn-primary">
                      Watch The Course                </button>
            </a>

            </Link>
            <Video/>
            <Upload Uploadvideo={Uploadvideo}/>
            <div>
                                <button onClick={() => handleRating(1)}>1</button>
                                <button onClick={() => handleRating(2)}>2</button>
                                <button onClick={() => handleRating(3)}>3</button>
                                <button onClick={() => handleRating(4)}>4</button>
                                <button onClick={() => handleRating(5)}>5</button>
                                </div>
                                <div>
                        <p>Current course rating: {rating}</p>
                        </div>
                        <div>
                                <button onClick={() => handleRatingi(1)}>1</button>
                                <button onClick={() => handleRatingi(2)}>2</button>
                                <button onClick={() => handleRatingi(3)}>3</button>
                                <button onClick={() => handleRatingi(4)}>4</button>
                                <button onClick={() => handleRatingi(5)}>5</button>
                                </div>
                                <div>
                        <p>Current Instructor rating: {ratingi}</p>
                        </div>
                        <button onClick={handleSubmit}>Submit</button>
            <div className='text-center'> 
                    {[...Array(6)].map((star,i) => {
                        const ratingValue = i+1;
                        return <label>  <input type="radio" 
                        name="rating" 
                        value={ratingValue}

                        onClick={() => setRating(ratingValue)}
                        /> 
                        <FaStar className="star" color ={ratingValue <= rating ? "#ffc107": "#e4e5e9"} size={10}/>
                        </label>
                    })}
            </div>
            <button onClick={handleSubmiti}>Submit</button>

            <div className='text-center'> 
                    {[...Array(6)].map((star,i) => {
                        const ratingValue = i+1;
                        return <label>  <input type="radio" 
                        name="rating" 
                        value={ratingValue}

                        onClick={() => setRatingi(ratingValue)}
                        /> 
                        <FaStar className="star" color ={ratingValue <= ratingi ? "#ffc107": "#e4e5e9"} size={10}/>
                        </label>
                    })}
            </div>
            <Post/>

        </Col>
    </Row>
</div>

   )
}
export default CourseDetails;