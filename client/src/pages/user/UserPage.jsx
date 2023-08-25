import Filter from "../../components/Filter";
import Card from "./Card";
import "../css/card.css";
import Modal from "./Modal";
// import jwt_decode from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";

function User() {
  const [filterValue, setFilterValue] = useState("All");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeJob, setActiveJob] = useState({});
  const [modal, setModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);

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
      // console.log(err.data.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getJobs();
  }, [filterValue]); //eslint-disable-line

  return (
    <>
      <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
      {!isLoading && data.length === 0 && (
        <h1 style={{ textAlign: "center" }}>No matches Found</h1>
      )}
      {!isLoading && (
        <>
          <div className="card-wrapper">
            <Card
              setActiveJob={setActiveJob}
              data={data}
              modal={modal}
              setModal={setModal}
              uploadModal={uploadModal}
              setUploadModal={setUploadModal}
            />
          </div>
          {modal && (
            <Modal activeJob={activeJob} modal={modal} setModal={setModal} />
          )}
          {uploadModal && (
            <Modal
              activeJob={activeJob}
              modal={uploadModal}
              setModal={setUploadModal}
              upload={true}
            />
          )}
        </>
      )}
      {isLoading && (
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Loading...
        </h1>
      )}
    </>
  );
}
export default User;
