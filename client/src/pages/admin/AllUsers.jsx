import "../css/card.css";
import axios from "axios";
import { useEffect, useState } from "react";

function AllUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  // get all users
  const getUsers = async () => {
    try {
      setIsLoading(true);
      const res = await axios(`http://127.0.0.1:8080/api/v1/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(res.data.data.allUsers);
      console.log(res.data.data.allUsers);
    } catch (err) {
      console.log("error user", err);
      alert(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []); //eslint-disable-line
  // delete users
  const handleDelete = (user_id) => {
    deleteUser(user_id);
  };
  const deleteUser = async (user_id) => {
    let res;
    try {
      res = await axios.delete(
        `http://127.0.0.1:8080/api/v1/users/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      getUsers();
      if (res.status === 204) alert("User deleted");
    } catch (err) {
      //   console.log(err);
      alert(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="card-wrapper">
        {!isLoading && data.length === 0 && <h1>No Users</h1>}
        {!isLoading &&
          data.map((item, index) => (
            <div key={index} className="card">
              <div className="card-header">
                <div className="card-category-wrapper">
                  <h3>{item.name}</h3>
                  <p className="card-category">{item.role}</p>
                </div>
                <h5>{item.email}</h5>
                <hr />
              </div>
              <div
                className="btn-wrapper"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
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
      </div>
      {isLoading && <h1 style={{ textAlign: "center" }}>Loading...</h1>}
    </>
  );
}
export default AllUsers;
