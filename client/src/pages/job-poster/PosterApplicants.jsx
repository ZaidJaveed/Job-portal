import "../css/card.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "../../components/Filter";
import jwt_decode from "jwt-decode";
function PosterApplicants() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filterValue, setFilterValue] = useState("all");
  // get Applicants
  const getApplicants = async () => {
    const { id: user_id } = jwt_decode(localStorage.getItem("token"));
    let res;
    // console.log(jwt_decode(localStorage.getItem("token")));
    try {
      setIsLoading(true);
      res = await axios(
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
  console.log(data);
  useEffect(() => {
    getApplicants();
  }, [filterValue]); //eslint-disable-line
  console.log(filterValue);
  return (
    <>
      <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
      <div className="card-wrapper">
        {!isLoading && data.length === 0 && <h1>No Matches Found</h1>}
        {!isLoading &&
          data.map((item) =>
            item.applicants.map((user, index) => (
              <div key={index} className="card">
                <div className="card-header">
                  <div className="card-category-wrapper">
                    <h3>{user.name}</h3>
                    <p className="card-category">{item.category}</p>
                  </div>
                  <hr />
                  <h4>Applied for:{item.title}</h4>
                  <h5>{item.organization}</h5>
                </div>
                <div
                  className="btn-wrapper"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <a
                    href={`http://127.0.0.1:8080/${user.resume}`}
                    download={`${user.resume}`.split("/")[1]}
                  >
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "#E76335",
                      }}
                    >
                      Download CV
                    </button>
                  </a>
                </div>
              </div>
            ))
          )}
      </div>
      {isLoading && <h1 style={{ textAlign: "center" }}>Loading...</h1>}
    </>
  );
}
export default PosterApplicants;
