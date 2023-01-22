import React ,{useState}from "react";
import { Col } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Axios from 'axios'
const CardCourse = ({ course }) => {
  const [showForm, setShowForm] = useState(false);
  const [review, setReview] = useState('');
  // const hamada = .Video_link;
  // console.log(hamada);
  // localStorage.setItem("video",hamada);
  const handleSubmitt = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.put(`http://localhost:3000/review/:id}`, {
        review
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
    setShowForm(false);
    setReview('');  };
  return (
    // <div>
    //   <h2>{course.name}</h2>
    //   <p>Price: ${course.price}</p>
    //   <button onClick={() => setShowReview(!showReview)}>
    //     {showReview ? 'Hide review' : 'Show review'}
    //   </button>
    //   {showReview && <p>review:{course.review}</p>}
    // </div>
//     <div>
//     <h2>{course.name}</h2>
//     <p>title: {course.title}</p>
//     <p>reviews: {course.review}</p>
//     <button onClick={() => setShowForm(!showForm)}>
//       {showForm ? 'Cancel' : 'Add Review'}
//     </button>
//     {showForm && (
//       <form onSubmit={handleSubmitt}>
//         <label>
//           Review:
//           <textarea
//             value={review}
//             onChange={(e) => setReview(e.target.value)}
//           />
//         </label>
//         <button type="submit">Save</button>
//       </form>
//     )}
//   </div>
// );
// }
    <Col xs="6" sm="6" md="4" lg="3" className="my-1">
      <Link to={`/course/${course._id}`}>
        <div className="card">
           <img src="img.jpg"/> 
          <div className="card__overlay">
            <div className="overlay__text text-center w-100 p-2">
              <p> Totalhours: {course.Totalhours}</p>
              <p>title:{course.title}</p>
              <p>price:{course.price}</p>
              <p>rating:{course.rate} </p>
              <p>Video_description:{course.Video_description}</p>
              <p>outline:{course.outline}</p>
            
            </div>
          </div>
        </div>
      </Link>
    </Col >
  );
};

export default CardCourse;