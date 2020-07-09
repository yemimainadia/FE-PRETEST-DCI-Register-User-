import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import FormFile from 'react-bootstrap/FormFile';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }

    return (
        <Row>
            <div>
                <Form>
                    <Form.File
                        id="profile-pict-upload"
                        label="Profile Picture Upload"
                        custom
                        onChange={onSelectFile}
                    />
                </Form>
            </div>
            <div className="upload-image-preview">
                {selectedFile && <img src={preview} />}
            </div>
        </Row>
    )
}
