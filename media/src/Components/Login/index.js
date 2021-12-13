import { Form, Button, Container } from "react-bootstrap";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [logResponse, setLogResponse] = useState("");

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    
    await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        if(response.data){
          navigate("/posts");
        

        }
        <Button className="button" onClick={login}>
        Login
      </Button>
      });
  };


  const reg = () => {

    navigate("/Registration");
  };
  return (
    <div className="loginform">
      <Container>
        <h1 className="p-3 mb-2 bg-gradient-light text-dark">Login</h1>
        <form action="/login" method="POST">
          <Form.Group className="m-5" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <br />
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <br />

            <Form.Label>Password</Form.Label>
            <br />
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />

            <Form.Check type="checkbox" label="Remeber me" />
            <p>{logResponse}</p>

            <Button className="button" onClick={login}>
              Login
            </Button>
            <p>Need an Account ?</p>
            <Button
              type="button"
              className="button"
              variant="outline-dark"
              onClick={reg}
            >
              Register
            </Button>
          </Form.Group>
        </form>
      </Container>
    </div>
  );
};

export default Login;