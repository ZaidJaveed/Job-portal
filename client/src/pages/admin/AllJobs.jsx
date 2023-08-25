import "../css/card.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "../../components/Filter";
import AddJobModal from "./AddJobModal";
import EditModal from "./EditJobModal";
function AllJobs() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filterValue, setFilterValue] = useState("all");
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [activeJob, setActiveJob] = useState({});
  // get all jobs
  const getJobs = async () => {
    try {
      setIsLoading(true);
      const res = await axios(
        `http://127.0.0.1:8080/api/v1/jobs?filter=${filterValue.toLocaleLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(res.data.data.jobs);
    } catch (err) {
      alert(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getJobs();
  }, [filterValue]); //eslint-disable-line
  // delete jobs
  const handleDelete = (job_id) => {
    deleteJob(job_id);
  };
  const deleteJob = async (job_id) => {
    let res;
    try {
      res = await axios.delete(`http://127.0.0.1:8080/api/v1/jobs/${job_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getJobs();
      if (res.status === 204) alert("Job deleted");
    } catch (err) {
      //   console.log(err);
      alert(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="filter-add-wrapper">
        <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
        <button onClick={() => setModal(true)} className="btn-add-job">
          + Add Job
        </button>
      </div>
      <AddJobModal getJobs={getJobs} modal={modal} setModal={setModal} />

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
                <h3 style={{ textAlign: "right" }}>
                  Posted By:{item.postedBy?.name}
                </h3>
                <h5>Description:</h5>
                <p>{item.description}</p>
              </div>
              <div
                className="btn-wrapper"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <button
                  className="btn"
                  style={{ backgroundColor: "#5BF587" }}
                  onClick={() => {
                    setEditModal(true);
                    setActiveJob(item);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn"
                  style={{ backgroundColor: "#E76335" }}
                  onClick={() => {
                    // setActiveJob(item._id);
                    handleDelete(item._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        <EditModal
          getJobs={getJobs}
          modal={editModal}
          setModal={setEditModal}
          activeJob={activeJob}
        />
      </div>
      {isLoading && <h1 style={{ textAlign: "center" }}>Loading...</h1>}
    </>
  );
}
export default AllJobs;
