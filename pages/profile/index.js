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

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    useEffect(() => {
        const tokenauthID = localStorage.getItem("access_token");
        if (!tokenauthID) {
            Router.replace("/private", "/", { shallow: true });
        } else {
            setTokenID(tokenauthID);
        }

        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);

    }, [tokenID, selectedFile]);

    if (!tokenID) return <LoginPageLanding />;
    // the JSX the private page will render
    const pageConfig = {
        title: "My Profile",
    };
    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
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
                            <Image src="/asset/cover/profile-picture.png" fluid bsPrefix="img-fluid profile-picture" />
                        </Col>
                    </Row>
                    <Row>
                        <Col><Education /></Col>
                    </Row>
                    <Row>
                        <ImageUpload />
                    </Row>
                </Container>

            </main>
            <Footer />
        </div>
    );
};

export default Profile;
