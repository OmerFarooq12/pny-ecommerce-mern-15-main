import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container'
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from 'react-router-dom';

export default function Verification() {
    const location = useLocation()
    const navigate = useNavigate()
    const [code, setCode] = useState('')
    const [error, setError] = useState({ message: "", status: false });
    
    const handleSubmit = (event) => {
        event.preventDefault()

        if(!code) {
            setError({ message: "Please enter a verification code", status: true });
        } else {
            axios.post("http://127.0.0.1:8000/verification", {
                email: location.state.email,
                code: code
            }).then(res => {
                if(res.data.status === "200") {
                    navigate('/login')
                } else {
                    setError({ message: res.data.message, status: true });
                }
            }).catch(error => {
                setError({ message: error, status: true });
            })
        }
    }

    return (
        <>
            <Container>
                <h1 className="text-center mt-5">Verification Page</h1>
                <p className='text-center'>Kindly check your email: {location.state.email}</p>
                {error.status && (
                    <p className="text-center text-danger">{error.message}</p>
                  )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                    >
                        <Form.Label>Verification Code</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter verification code"
                            value={code}
                            onChange={(e) => {
                                setCode(e.target.value);
                            }}
                        />
                    </Form.Group>

                    <Button type="submit" className="mx-auto mt-5 d-flex">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    )
}
