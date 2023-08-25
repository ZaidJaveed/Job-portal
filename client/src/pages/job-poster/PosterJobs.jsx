import "../css/card.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "../../components/Filter";
import jwt_decode from "jwt-decode";
import PostModal from "./PostModal";

function JobPoster() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filterValue, setFilterValue] = useState("all");
  const [modal, setModal] = useState(false);
  const { id: user_id } = jwt_decode(localStorage.getItem("token"));
  // get all jobs
  const getJobs = async () => {
    // console.log(jwt_decode(localStorage.getItem("token")));
    try {
      setIsLoading(true);
      const res = await axios(
        `http://127.0.0.1:8080/api/v1/jobs/${user_id}?filter=${filterValue.toLocaleLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(res.data.data.jobs);
    } catch (err) {
      alert(err.response);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getJobs();
  }, [filterValue]); //eslint-disable-line

  return (
    <>
      <div className="filter-add-wrapper">
        <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
        <button onClick={() => setModal(true)} className="btn-add-job">
          + Add Job
        </button>
      </div>
      {modal && (
        <PostModal getJobs={getJobs} modal={modal} setModal={setModal} />
      )}
      <div className="card-wrapper">
        {!isLoading && data.length === 0 && <h1>No Matches Found</h1>}
        {!isLoading &&
          data.map((item, index) => (
            <div key={index} className="card">
              <div className="card-header">
                <div className="card-category-wrapper">
                  <h3>{item.title}</h3>
                  <p className="card-category">{item.category}</p>
                </div>
                <h5>{item.organization}</h5>
                <hr />
                <p>{item.description}</p>
              </div>
            </div>
          ))}
      </div>
      {isLoading && <h1 style={{ textAlign: "center" }}>Loading...</h1>}
    </>
  );
}
export default JobPoster;
