import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import Header from "./components/header";
import Footer from "./components/footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import API from './api';

const LoginPage = dynamic(() => import("./index"));

const Otp = () => {
    const [registrationID, setRegistrationID] = useState("");
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const regisID = localStorage.getItem("registration-id");
        if (!regisID) {
            Router.replace("/private", "/", { shallow: true });
        } else {
            setRegistrationID(regisID);
        }
    });

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() !== false) {
            const otp_input_code = event.target.registrationOTP_one.value + event.target.registrationOTP_two.value + event.target.registrationOTP_three.value + event.target.registrationOTP_four.value;
            const dataUser = {
                otp_code: otp_input_code,
                user_id: registrationID
            };
            console.log(dataUser);
            API.post('register/otp/match', dataUser).then(response => {
                const { data } = response.data;
                if (data) {
                    const { access_token } = data.user;
                    Router.push("/profile");
                    localStorage.setItem('access_token', access_token);
                }
            }).catch(error => {
                if (error.response) {
                    const { errors } = error.response.data.error;
                    alert(errors);
                }
            });
        }
        setValidated(true);
    };

    const handleResendOTP = () => {
        const userPhone = localStorage.getItem('registration-phone');
        const dataUser = {
            phone: userPhone
        };
        if (userPhone) {
            API.post('register/otp/request', dataUser).then(response => {
                const { data } = response.data;
                console.log(data);
                if (data) {

                }
            }).catch(error => {
                if (error.response) {
                    const { errors } = error.response.data.error;
                    alert(errors);
                }
            });
        }
    }

    if (!registrationID) return <LoginPage />;
    // the JSX the private page will render
    const pageConfig = {
        title: "OTP Verification",
    };
    return (
        <div className="container otp">
            <Header pageConfig={pageConfig} />
            <main>
                <Container>
                    <h3>Verifikasi Akun</h3>
                    <Form className="form-otp-wrapper"
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <Row bsPrefix='row form-input'>
                            <Col>
                                <FormControl
                                    bsPrefix="form-control otp-input-satuan"
                                    aria-label="Large"
                                    aria-describedby="inputGroup-sizing-sm"
                                    required
                                    name="registrationOTP_one"
                                    type="number"
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                                    }}
                                />
                            </Col>
                            <Col>
                                <FormControl
                                    bsPrefix="form-control otp-input-satuan"
                                    aria-label="Large"
                                    aria-describedby="inputGroup-sizing-sm"
                                    required
                                    name="registrationOTP_two"
                                    type="number"
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                                    }}
                                />
                            </Col>
                            <Col>
                                <FormControl
                                    bsPrefix="form-control otp-input-satuan"
                                    aria-label="Large"
                                    aria-describedby="inputGroup-sizing-sm"
                                    required
                                    name="registrationOTP_three"
                                    type="number"
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                                    }}
                                />
                            </Col>
                            <Col>
                                <FormControl
                                    bsPrefix="form-control otp-input-satuan"
                                    aria-label="Large"
                                    aria-describedby="inputGroup-sizing-sm"
                                    required
                                    name="registrationOTP_four"
                                    type="number"
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row bsPrefix='row form-submit'>
                            <Col>
                                <Button variant="warning" size="lg" block type="submit">
                                    Verifikasi
                                </Button>
                            </Col>
                        </Row>
                        <Row bsPrefix='row form-resend-otp'>
                            <Col>
                                <Button
                                    variant="success"
                                    size="lg"
                                    block
                                    variant="link"
                                    onClick={handleResendOTP}
                                >
                                    Kirim Kode Verifikasi Ulang
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </main>
            <Footer />
        </div>
    );
};

export default Otp;
