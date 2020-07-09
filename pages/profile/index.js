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
import Button from "react-bootstrap/Button";
import Education from "./education";
import Axios from "axios";
import { ImageUpload } from "./imageUpload";

const LoginPageLanding = dynamic(() => import("../index"));

const Profile = () => {
    const [tokenID, setTokenID] = useState("");
    const [validated, setValidated] = useState(false);
    const [imageData, setImageData] = useState();

    useEffect(() => {
        const tokenauthID = localStorage.getItem("access_token");
        if (!tokenauthID) {
            Router.replace("/private", "/", { shallow: true });
        } else {
            setTokenID(tokenauthID);
        }
    }, [tokenID]);


    if (!tokenID) return <LoginPageLanding />;
    // the JSX the private page will render
    const pageConfig = {
        title: "My Profile",
    };

    const callbackImageHandle = (value) => {
        // retrieve uploaded image URL from imageUpload.js
        // the set "imageData" state to be shown / use as <Image src/>
        if (value) {
            setImageData(value);
        }
    }

    return (
        <div className="container otp">
            <Header pageConfig={pageConfig} />
            <main>
                <Navigation />
                <Container bsPrefix="container profile-container">
                    <Row>
                        <Col>
                            <Image src="/asset/cover/cover.jpg" fluid bsPrefix="img-fluid cover-profile" />
                            <Image src={imageData ? imageData : "/asset/cover/profile-picture.png"} fluid bsPrefix="img-fluid profile-picture" />
                        </Col>
                    </Row>
                    <Row>
                        {/*<Col><Education /></Col>*/}
                    </Row>
                    <Row>
                        <ImageUpload callbackImageHandle={callbackImageHandle} />
                    </Row>
                </Container>

            </main>
            <Footer />
        </div>
    );
};

export default Profile;
