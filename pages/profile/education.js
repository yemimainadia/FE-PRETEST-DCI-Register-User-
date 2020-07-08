import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Education = () => {
    const [tokenID, setTokenID] = useState("");
    const [educationlist, setEducationlist] = useState("");

    useEffect(() => {
        const tokenauthID = localStorage.getItem("access_token");        
        if (tokenauthID) {            
            setTokenID(tokenauthID);
            getEducationList(tokenauthID)
        }
    },[tokenID]);

    const getEducationList = (tokenID) => {
        const config = {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `${tokenID}`
            }
        }
        console.log(config);
        axios.get( 
            'http://pretest-qa.dcidev.id/api/v1/profile/me/',
            config
        )        
        .then(response => {
            const {data} = response.data;
            if(data) {                    
                const {education} = data.user;
                setEducationlist(education);
            }
        })
        .catch(error => {
            if(error.response) {
                const { errors } = error.response.data.error;
                if(errors[0].message) {
                    alert(errors[0].message);
                } else {
                    alert(errors);
                }
            }
        });
    }

    return (
        <div className="education-list-container">
        {(educationlist) ? (
            [
                <ul className="education-list">
                    {educationlist.map(education => (
                        <li key={education.school_name+education.graduation_time}>
                            <span>School: {education.school_name}</span>
                            <span>Graduated: {education.graduation_time}</span>                            
                        </li>
                    ))}
                </ul>
            ]
        ) : (
            <span className="list-coming-soon">No data can be shown </span>
        )}
        </div>
    );
}

export default Education;
