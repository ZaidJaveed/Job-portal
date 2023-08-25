import "../css/modal.css";
import axios from "axios";
import { useState } from "react";

const categories = [
  "UI/UX developer",
  "Web developer",
  "HR",
  "Technical support",
  "Proposal development",
  "Business Analyst",
];
export default function PostModal({ modal, setModal, getJobs }) {
  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [categoryState, setCategoryState] = useState([]);

  const addJob = async (body) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8080/api/v1/jobs`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      getJobs();
    } catch (error) {
      console.log(error);
    }
  };
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const organization = e.target.organisation.value;
    const category = categoryState;
    const body = {
      title,
      description,
      organization,
      category,
    };
    console.log("body of post", body);
    addJob(body);
    toggleModal();
  };

  return (
    <>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <form
            metyhod="POST"
            onSubmit={handleSubmit}
            className="modal-content "
          >
            <div className="modal-content add-job-form">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" id="title" required />
              <label htmlFor="description">description</label>
              <textarea
                name="description"
                id="description"
                rows={5}
                cols={23}
                required
              />
              <label htmlFor="organisation">organisation</label>
              <input
                type="text"
                name="organisation"
                id="organisation"
                required
              />
              <label htmlFor="filter-category">Select Category</label>
              <select
                onChange={(e) => setCategoryState(e.target.value)}
                value={categoryState}
                id="filter-category"
                required
              >
                {categories.map((ele) => (
                  <option value={ele} key={ele}>
                    {ele}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: "black" }}
              >
                submit
              </button>
              <button className="close-modal" onClick={toggleModal}>
                CLOSE
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
