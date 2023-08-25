function Card({
  modal,
  setModal,
  data,
  setActiveJob,
  uploadModal,
  setUploadModal,
}) {
  // console.log(data);
  return data.map((item, index) => (
    <div key={index} className="card">
      <div className="card-header">
        <div className="card-category-wrapper">
          <h3>{item.title}</h3>
          <p className="card-category">{item.category}</p>
        </div>
        <h5>{item.organization}</h5>
        <hr />
      </div>
      <div className="btn-wrapper">
        <button
          onClick={() => {
            setUploadModal(true);
            setActiveJob(item);
          }}
          className="btn"
        >
          Apply{" "}
        </button>
        <button
          className="btn"
          onClick={() => {
            setModal(!modal);
            setActiveJob(item);
          }}
        >
          Details
        </button>
      </div>
    </div>
  ));
}
export default Card;
