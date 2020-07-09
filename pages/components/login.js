import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import API from '../api';
import Router from "next/router";

const Login = () => {
    const [validated, setValidated] = useState(false);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLatitude(String(position.coords.latitude));
            setLongitude(String(position.coords.longitude));
        },
            function (error) {
                if (error.message === 'User denied Geolocation') {
                    setLatitude('000');
                    setLongitude('000');
                }
            });
    }, [latitude, longitude]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() !== false) {
            event.preventDefault();
            event.stopPropagation();
            const dataUser = {
                phone: event.target.loginPhone.value,
                password: event.target.loginPassword.value,
                latlong: latitude + "," + longitude,
                device_token: 'yemimafe',
                device_type: 2
            }
            API.post('oauth/sign_in', dataUser)
                .then(response => {
                    const { data } = response.data;
                    if (data) {
                        const { access_token } = data.user;
                        Router.push("/profile");
                        localStorage.setItem('access_token', access_token);
                    }
                })
                .catch(error => {
                    if (error.response) {
                        const { errors } = error.response.data.error;
                        if (errors[0].message) {
                            alert(errors[0].message);
                        } else {
                            alert(errors);
                        }
                    }
                });
        }
        setValidated(true);
    };
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <fieldset>
                <h3>Already have an account? Login Here:</h3>
            </fieldset>
            <Form.Group controlId="loginPhone">
                <Form.Label>Phone #</Form.Label>
                <Form.Control type="text" placeholder="contoh: 628123123xxx " required name="loginPhone" />
                <Form.Text className="text-muted">
                    We'll never share your phone with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required name="loginPassword" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default Login;
