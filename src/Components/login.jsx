import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBSpinner,
} from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Cookies from "js-cookie";
import { saveLogs } from './logs';

function Login() {
  const [submit, setSubmit] = useState(false);
  const [valid, setValid] = useState();


  useEffect(() => {
    if (Cookies.get("mode") == "light") {
      document.body.className = "light-mode";
    } else {
      document.body.className = "dark-mode";
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://fresh-tropical-colony.glitch.me/adminsignin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if(response.ok)
      {

        localStorage.setItem('login',true);

        window.location.href='/editcourses';
        console.log("Sign-in successful");

      }
else {
        console.error("Sign-in failed");
      }
    } catch (error) {
      window.alert(error)
      console.error("Error during sign-in:", error);
    }
  };



  return (
    <div>
      <div className="login-container">
        <MDBContainer fluid>
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard
                className="my-5 mx-auto"
                id="card"
                style={{ borderRadius: 0, maxWidth: "400px" }}
              >
                <MDBCardBody className="p-5 w-100 d-flex flex-column">
                  <form >
                    <center>
                      <img
                        src="./Assets/logo.svg"
                        alt="Sushi"
                        style={{
                          width: "180px",
                          borderRadius: "50%",
                          height: "150px",
                        }}
                      />
                    </center>
                    <h4 style={{ marginTop: "10px", marginBottom: "30px" }}>
                      Login
                    </h4>
                    <Form.Group className="mb-3">
                    <Form.Control
                        autoFocus
                        required
                        type="email"
                        placeholder="example@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <MDBBtn
                      type="submit"
                      size="lg"
                      style={{
                        borderRadius: 0,
                        width: "100%",
                        backgroundColor: valid ? "red" : "",
                      }}
                      className="btnsc"
                    >
                      {submit ? (
                        <MDBSpinner color="info" />
                      ) : valid ? (
                        <span>Incorrect Login</span>
                      ) : (
                        <span onClick={handleSignIn}>Login</span>
                      )}
                    </MDBBtn>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <footer className="footer">
        <p>
        &copy; {new Date().getFullYear()} Copyright © 2024 Universiti Tenaga Nasional (199601026142). All rights reserved. UNITEN Personal Data Protection Policy
        </p>
      </footer>
    </div>
  );
}

export default Login;
