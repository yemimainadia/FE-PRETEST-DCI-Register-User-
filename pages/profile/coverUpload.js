import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import FormFile from 'react-bootstrap/FormFile';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from 'axios';

export const CoverUpload = ({ callbackCoverHandle }) => {
    const [selectedFile, setSelectedFile] = useState();
    const [validated, setValidated] = useState(false);
    const [preview, setPreview] = useState();
    const [tokenID, setTokenID] = useState("");

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        const tokenauthID = localStorage.getItem("access_token");
        if (tokenauthID) {
            setTokenID(tokenauthID);
        }

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return
        }
        setSelectedFile(e.target.files[0])
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() !== false) {
            var formData = new FormData();
            formData.append('image', selectedFile);

            let headerConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `${tokenID}`
                }
            }
            axios.post(
                'http://pretest-qa.dcidev.id/api/v1/uploads/cover',
                formData, headerConfig
            ).then(response => {
                const { data } = response.data;
                // getURL Image
                // send back to profile/index.js to be caught by callbackImageHandle()            
                callbackCoverHandle(data.user_picture.picture.url);
                // reset data
                setSelectedFile();
                setPreview();
            }).catch(error => {
                console.log(error);
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
        <Row>
            <div className="form-upload-cover-picture">
                <Form onSubmit={handleSubmit}>
                    <Form.File
                        id="cover-pict-upload"
                        label="Cover Picture Upload"
                        custom
                        onChange={onSelectFile}
                        type="file" name="file" required
                    />
                    <Button variant="warning" type="submit" size="sm">
                        Set & Upload Cover
                    </Button>
                </Form>
            </div>
            <div className="upload-image-preview">
                {selectedFile && <img src={preview} />}
            </div>
        </Row>
    )
}
