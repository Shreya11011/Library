import React, { useContext, useEffect, useState } from 'react';
import { Dropdown } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import './SignUp.css';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../Context/AuthContext.js';

function SignUp() {
    const API_URL = process.env.REACT_APP_API_URL
    const [isLoading, setIsLoading] = useState(false)

    const [userFullName, setUserFullName] = useState(null)
    const [admissionId, setAdmissionId] = useState(null)
    const [employeeId, setEmployeeId] = useState(null)
    const [address, setAddress] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [mobileNumber, setMobileNumber] = useState(null)
    const [recentAddedMembers, setRecentAddedMembers] = useState([])
    const [userType, setUserType] = useState(null)
    const [gender, setGender] = useState(null)
    const [age, setAge] = useState(null)
    const [dob, setDob] = useState(null)
    const [dobString, setDobString] = useState(null)


    const genderTypes = [
        { value: "Male", text: "Male" },
        { value: "Female", text: "Female" }
    ]

    const userTypes = [
        { value: 'Staff', text: 'Staff' },
        { value: 'Student', text: 'Student' }
    ]

    //Add a Member
    const addMember = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (userFullName !== null && userType !== null && age !== null && dobString !== null && gender !== null && address !== null && mobileNumber !== null && email !== null && password !== null) {
            let isAdmin = false;
            if (userType === "Staff") {
                isAdmin = true;
            }
        
            const userData = {
                userType: userType,
                userFullName: userFullName,
                admissionId: admissionId,
                employeeId: employeeId,
                age: age,
                dob: dobString,
                gender: gender,
                address: address,
                mobileNumber: mobileNumber,
                email: email,
                password: password,
                isAdmin: isAdmin
            }
            try {
                const response = await axios.post(API_URL + "api/auth/register", userData)
                if (recentAddedMembers.length >= 5) {
                    recentAddedMembers.splice(-1)
                }
                setRecentAddedMembers([response.data, ...recentAddedMembers])
                setUserFullName(null)
                setUserType("Student")
                setAdmissionId(null)
                setEmployeeId(null)
                setAddress(null)
                setMobileNumber(null)
                setEmail(null)
                setPassword(null)
                setGender(null)
                setAge(null)
                setDob(null)
                setDobString(null)
                alert("Member Added")
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            alert("All the fields must be filled")
        }
        setIsLoading(false)
    }

    //Fetch Members
    useEffect(() => {
        const getMembers = async () => {
            try {
                const response = await axios.get(API_URL + "api/users/allmembers")
                const recentMembers = await response.data.slice(0, 5)
                setRecentAddedMembers(recentMembers)
            }
            catch (err) {
                console.log(err)
            }
        }
        getMembers()
    }, [API_URL])

    return (
        <div>
            <p className="dashboard-option-title">ADD NEW MEMBER</p>
            <div className="dashboard-title-line"></div>
            <form className="addmember-form" onSubmit={addMember}>
                <div className='semanticdropdown-container'>
                    <div className='semanticdropdown'>
                        <Dropdown
                            placeholder='User Type'
                            fluid
                            selection
                            options={userTypes}
                            defaultValue={userTypes[0].value}
                            onChange={(event, data) => setUserType(data.value)}
                        />
                    </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <label className="addmember-form-label" htmlFor="userFullName">Full Name <span className="required-field">*</span></label>
                    <input className="addmember-form-input" type="text" name="userFullName" value={userFullName} required onChange={(e) => setUserFullName(e.target.value)}></input>

                    <label className="addmember-form-label" htmlFor={userType === "Student" ? "admissionId" : "employeeId"}>{userType === "Student" ? "Admission Id " : "Employee Id "}<span className="required-field">*</span></label>
                    <input className="addmember-form-input" type="text" value={userType === "Student" ? admissionId : employeeId} required onChange={(e) => { userType === "Student" ? setAdmissionId(e.target.value) : setEmployeeId(e.target.value) }}></input><br />
                </div>
                <div className="form-row">
                    <label className="addmember-form-label" htmlFor="mobileNumber">Mobile Number <span className="required-field">*</span></label>
                    <input className="addmember-form-input" type="text" value={mobileNumber} maxLength={10} pattern="[0-9]*" required onChange={(e) => setMobileNumber(e.target.value)}></input>

                    <label className="addmember-form-label" htmlFor="gender">Gender <span className="required-field">*</span></label>
                    <div className='semanticdropdown-addmember'>
                        <Dropdown
                            placeholder='User Type'
                            fluid
                            selection
                            value={gender}
                            options={genderTypes}
                            onChange={(event, data) => setGender(data.value)}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <label className="addmember-form-label" htmlFor="age">Age <span className="required-field">*</span></label>
                    <input className="addmember-form-input" type="text" value={age} pattern="[0-9]" required onChange={(e) => { const inputValue = e.target.value; if (/^\d$/.test(inputValue)) {setAge(inputValue); }}}></input>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label className="addmember-form-label" htmlFor="dob">DOB <span className="required-field">*</span></label>
                    <DatePicker
                        className="date-picker-addmember"
                        placeholderText="MM/DD/YYYY"
                        selected={dob}
                        onChange={(date) => { setDob(date); setDobString(moment(date).format("MM/DD/YYYY")) }}
                        dateFormat="MM/dd/yyyy"
                    />
                    </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <label className="addmember-form-label" htmlFor="address">Address <span className="required-field">*</span></label>
                    <input className="addmember-form-input address-field" value={address} type="text" required onChange={(e) => setAddress(e.target.value)}></input>

                    <label className="addmember-form-label" htmlFor="email">Email <span className="required-field">*</span></label>
                    <input className="addmember-form-input" type="email" value={email} required onChange={(e) => setEmail(e.target.value)}></input><br />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <label className="addmember-form-label" htmlFor="password">Password <span className="required-field">*</span></label>
                    <input className="addmember-form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input><br />
                </div>
                <input className="addmember-submit" type="submit" value="SUBMIT" disabled={isLoading} ></input>

            </form>
            
            
        </div>
    )
}


export default SignUp;