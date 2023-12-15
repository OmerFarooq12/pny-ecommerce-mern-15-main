import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ message: "", status: false });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username) {
      setError({ message: "Please enter a username", status: true });
    } else if (!email) {
      setError({ message: "Please enter a email", status: true });
    } else if (!password) {
      setError({ message: "Please enter a password", status: true });
    } else if (password.length < 8) {
      setError({ message: "Password length should be atleast 8 characters", status: true });
    } else {
        await axios.post("http://127.0.0.1:8000/register", {
            username: username,
            email: email,
            password: password,
        }).then(res => {
            if(res.data.status === "200") {
                navigate('/verification', {state: {email: email}})
            } else {
                setError({ message: res.data.message, status: true });
            }
        }).catch((error) => {
            setError({ message: error, status: true });
        })
    }
  };

  return (
    <>
      <Container>
        <h1 className="text-center my-5">Login Page</h1>
        {error.status && (
          <p className="text-center text-danger">{error.message}</p>
        )}
        <Row>
        <Col>
            
        </Col>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>

              <Button type="submit" className="mx-auto mt-5 d-flex">
                Register
              </Button>
            </Form>
          </Col>

          <Col></Col>
        </Row>
      </Container>
    </>
  );
}
