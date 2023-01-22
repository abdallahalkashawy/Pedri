
const CourseItem = ({ item }) => {
  return (
    <div className="col-sm-4">
      <div className="card my-2">
        {/* <img src={item?.image} className="card-img-top" alt="" /> */}
        <div className="card-body">
          <p className="card-text">{item?.rate}</p>
          <p className="card-text">{item?.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;