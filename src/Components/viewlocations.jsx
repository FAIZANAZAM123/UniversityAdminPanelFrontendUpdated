import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Cookies from "js-cookie";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBSpinner,
} from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";

export default function ViewLocations() {
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState([]);
  const [street, setStreet] = useState("");
  const [basicModal, setBasicModal] = useState(false);
  const [id, setId] = useState("");
  const toggleShow = () => setBasicModal(!basicModal);

  useEffect(() => {
    setShow(true);
    if (Cookies.get("mode") == "light") {
      document.body.className = "light-mode";
    } else {
      document.body.className = "dark-mode";
    }
    getData();
  }, []);

  const handleStreet = (event) => {
    setStreet(event.target.value);
  };

  async function getData() {
    await fetch(`http://localhost:4000/getlocations`, {
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
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this location?")) {
      await fetch(`http://localhost:4000/deletelocation?id=${id}`, {
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
          if (data.message == "deleted") {
            getData();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  async function UpdateLocation(event) {
    event.preventDefault();
    setSubmit(true);
    await fetch(
      `http://localhost:4000/updatelocation?street=${street}&id=${id}`,
      {
        method: "GET",
        headers: {
          "api-key": process.env.REACT_APP_API_KEY,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.message == "updated") {
          setSubmit(false);
          setBasicModal(false);
          getData();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

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
            Locations
          </h1>

          <div
            class="relative overflow-x-auto shadow-md sm:rounded-lg"
            style={{ borderRadius: 0, marginTop: "30px" }}
          >
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead
                class="uppercase"
                id="tablehead"
                style={{ padding: "10px", color: "#313a50" }}
              >
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Street
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Dated
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Edit
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody id="tablebody">
                {data.map((item, index) => (
                  <tr class="border-b">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium whitespace-nowrap "
                    >
                      {index + 1}
                    </th>
                    <td class="px-6 py-4">{item.street}</td>
                    <td class="px-6 py-4">
                      {new Date(item.dated).toLocaleString()}
                    </td>
                    <td class="px-6 py-4">
                      <a
                        href="#"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => {
                          toggleShow();
                          setStreet(item.street);
                          setId(item.Id);
                        }}
                      >
                        <i
                          className="fa fa-edit"
                          style={{ color: "green" }}
                        ></i>
                      </a>
                    </td>
                    <td class="px-6 py-4">
                      <a
                        onClick={() => {
                          handleDelete(item.Id);
                        }}
                        href="#"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <i className="fa fa-trash" style={{ color: "red" }}></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog style={{ borderRadius: 0 }}>
          <MDBModalContent id="card">
            <MDBModalHeader>
              <MDBModalTitle>Update Street</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <form onSubmit={UpdateLocation}>
              <MDBModalBody>
                <Form.Group className="mb-3">
                  <p style={{ marginBottom: "0px", textAlign: "left" }}>
                    Street
                  </p>
                  <Form.Control
                    type="text"
                    placeholder="1234 Alpenstrasse, 3012 Bern, Switzerland"
                    size="lg"
                    id="card"
                    value={street}
                    onChange={handleStreet}
                    required
                    style={{ borderRadius: 0, color: "black", flex: 1 }}
                  />
                </Form.Group>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn
                  type="submit"
                  className="btnsc"
                  style={{ borderRadius: 0 }}
                >
                  {submit ? (
                    <MDBSpinner color="info" />
                  ) : (
                    <span>Save Changes</span>
                  )}
                </MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}
