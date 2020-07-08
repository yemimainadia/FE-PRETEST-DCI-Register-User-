import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import Header from "../components/header";
import Footer from "../components/footer";
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image';
import Navigation from "./navigation";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Education from "./education";

const LoginPageLanding = dynamic(() => import("../index"));

const Profile = () => {
    const [tokenID, setTokenID] = useState("");
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const tokenauthID = localStorage.getItem("access_token");
        console.log(tokenauthID);
        if (!tokenauthID) {
            Router.replace("/private", "/", { shallow: true });
        } else {
            setTokenID(tokenauthID);
        }
    },[tokenID]);

    const handleSubmit = (event) => {};

    if (!tokenID) return <LoginPageLanding />;
    // the JSX the private page will render
    const pageConfig = {
        title: "My Profile",
    };
    return (
        <div className="container otp">
            <Header pageConfig={pageConfig} />
            <main>
                <Navigation/>
                <Container bsPrefix="container profile-container">
                    <Row>
                        <Col>
                            <Image src="/asset/cover/cover.jpg" fluid bsPrefix="img-fluid cover-profile"/>
                            <Image src="/asset/cover/profile-picture.png" fluid bsPrefix="img-fluid profile-picture"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col><Education/></Col>
                    </Row>
                </Container>
                
            </main>
            <Footer />
        </div>
    );
};

export default Profile;
