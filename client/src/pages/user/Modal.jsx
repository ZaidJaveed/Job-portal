import "../css/modal.css";
import { useState } from "react";
import axios from "axios";

export default function Modal({ modal, setModal, data, activeJob, upload }) {
  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const [file, setFile] = useState(null);
  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    const formData = new FormData();
    formData.append("resume", file);
    try {
      const res = await axios.patch(
        `http://127.0.0.1:8080/api/v1/users/apply/${user_id}-${activeJob._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      alert("Applied successfully");
    } catch (error) {
      alert(error.response.data.message);
    }
    toggleModal();
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  console.log("vale", activeJob);
  return (
    <>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>{activeJob.title}</h2>
            <div className="job-brief">
              <h4>Job description</h4>
              <p>{activeJob.description}</p>
              {upload && (
                <>
                  <label htmlFor="file">Upload your CV</label>
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    id="file"
                    name="file"
                    type="file"
                  />
                  <br />
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn"
                    style={{ backgroundColor: "black", marginTop: "10px" }}
                  >
                    {" "}
                    submit{" "}
                  </button>
                </>
              )}
            </div>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
