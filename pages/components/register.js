import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CountryDropdown, CountryRegionData } from 'react-country-region-selector';
import API from '../api';
import Router from "next/router";

const Register = () => {
    const [country, setCountry] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        selectCountry(country);
        navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(String(position.coords.latitude));
            setLongitude(String(position.coords.longitude));
        },
        function(error) {
            if(error.message === 'User denied Geolocation') {
                setLatitude('000');
                setLongitude('000');
            } 
        });
    });

    const selectCountry = (val) => {
        setCountry(val);
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            const dataUser = {
                phone: event.target.registrationPhone.value,
                password: event.target.registrationPassword.value,
                country: country,
                latlong:latitude+","+longitude,
                device_token: 'yemimafe',
                device_type: 2
            }            
            API.post('register', dataUser)
            .then(response => {
                const {data} = response.data;
                const userID = data.user.id;
                console.log(userID);
                if(userID) {
                    Router.push("/otp");
                    localStorage.setItem('registration-id',userID);
                    localStorage.setItem('registration-phone',event.target.registrationPhone.value);
                }
            })
            .catch(error => {
                if(error.response) {
                    const { errors } = error.response.data.error;
                    alert(errors);
                }
            });
        }
        setValidated(true);
      };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <fieldset>
                <h3>Join with us by signing up below:</h3>
            </fieldset>
            <Form.Group controlId="registrationPhone">
                <Form.Label>Phone #</Form.Label>
                <Form.Control type="text" placeholder="contoh: 628123123xxx " required name="registrationPhone"/>
                <Form.Text className="text-muted">
                    We'll never share your phone with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="registrationPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required name="registrationPassword"/>
            </Form.Group>
            <Form.Group controlId="registrationCountry">
                <Form.Label>Country</Form.Label>
                <CountryDropdown
                    value={country}
                    onChange={(val) => selectCountry(val)}
                    whitelist={["ID", "SG", "MY"]} 
                    classes="form-control" required/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default Register;
