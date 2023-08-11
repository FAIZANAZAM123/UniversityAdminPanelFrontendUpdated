import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Cookies from "js-cookie";
import {
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBSpinner,
  MDBIcon,
} from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";

export default function Addlocation() {
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [street, setStreet] = useState("");

  useEffect(() => {
    setShow(true);
    if (Cookies.get("mode") == "light") {
      document.body.className = "light-mode";
    } else {
      document.body.className = "dark-mode";
    }
  }, []);

  const handleStreet = (event) => {
    setStreet(event.target.value);
  };

  const handleLocation = async (event) => {
    event.preventDefault();
    setSubmit(true);
    await fetch(`http://localhost:4000/addlocations?street=${street}`, {
      method: "GET",
      headers: {
        "api-key": process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.message == "added") {
          setSubmit(false);
          setSuccess(true);
          setStreet("");
          setTimeout(function () {
            setSuccess(false);
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="siderow">
      <div className="sidecol1">
        <Sidebar />
      </div>
      <div className="sidecol2">
        <div className={`welcome-animation ${show ? "show" : ""}`}>
          <h1
            className="dashboard"
            style={{
              textAlign: "left",
              paddingTop: "40px",
              fontWeight: "bolder",
            }}
          >
            Add Location
          </h1>
          <MDBCard
            style={{ borderRadius: 0, marginTop: "40px", margin: "5px" }}
            id="card"
          >
            <h4
              id="cardhead"
              style={{ textAlign: "left", padding: "15px", fontWeight: "bold" }}
            >
              Location
            </h4>
            <form onSubmit={handleLocation}>
              <MDBCardBody style={{ textAlign: "left" }}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="1234 Alpenstrasse, 3012 Bern, Switzerland"
                    size="lg"
                    id="card"
                    required
                    value={street}
                    onChange={handleStreet}
                    style={{ borderRadius: 0, color: "black" }}
                  />
                </Form.Group>
                <MDBBtn
                  style={{
                    width: "100%",
                    borderRadius: 0,
                    backgroundColor: success ? "green" : "",
                    color: success ? "white" : "",
                  }}
                  className="btnsc"
                  type="submit"
                >
                  {submit ? (
                    <MDBSpinner color="info" />
                  ) : success ? (
                    <span>Added</span>
                  ) : (
                    <span>Add</span>
                  )}
                </MDBBtn>
              </MDBCardBody>
            </form>
          </MDBCard>
        </div>
      </div>
    </div>
  );
}
