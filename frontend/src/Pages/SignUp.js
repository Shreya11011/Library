import React, { useState, useEffect } from 'react';
import './SignUp.css';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

function SignUp() {

    const API_URL = process.env.REACT_APP_API_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [userFullName, setUserFullName] = useState(null);
    const [admissionId, setAdmissionId] = useState(null);
    const [employeeId, setEmployeeId] = useState(null);
    const [address, setAddress] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [mobileNumber, setMobileNumber] = useState(null);
    const [recentAddedMembers, setRecentAddedMembers] = useState([]);
    const [userType, setUserType] = useState("Student"); 
    const [gender, setGender] = useState(null);
    const [dob, setDob] = useState(null);
    const [dobString, setDobString] = useState(null);

    const genderTypes = [
        { value: "Male", text: "Male" },
        { value: "Female", text: "Female" }
    ];

    // Function to calculate age from date of birth
    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    // Add a Member
    // Add a Member
    const addMember = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (
            userFullName !== null && userFullName.trim() !== "" &&
            dobString !== null && dobString.trim() !== "" &&
            gender !== null && gender.trim() !== "" &&
            address !== null && address.trim() !== "" &&
            mobileNumber !== null && mobileNumber.trim() !== "" &&
            email !== null && email.trim() !== "" &&
            password !== null && password.trim() !== ""
        ) {
                    
            
            let isAdmin = false;

            // Calculate age from DOB
            const age = calculateAge(dob);

            const userData = {
                userType: userType,
                userFullName: userFullName,
                admissionId: admissionId,
                employeeId: employeeId,
                age: age, // Age calculated here
                dob: dobString,
                gender: gender,
                address: address,
                mobileNumber: mobileNumber,
                email: email,
                password: password,
                isAdmin: isAdmin
            };
            try {
                const response = await axios.post(API_URL + "api/auth/register", userData);
                if (recentAddedMembers.length >= 5) {
                    recentAddedMembers.splice(-1);
                }
                setRecentAddedMembers([response.data, ...recentAddedMembers]);
                alert("Signup successful");
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            alert("All the fields must be filled");
        }
        setIsLoading(false);
    };

    // Reset form fields after submission
    useEffect(() => {
        if (!isLoading) {
            setUserFullName("");
            setAdmissionId("");
            setEmployeeId("");
            setAddress("");
            setMobileNumber("");
            setEmail("");
            setPassword("");
            setGender("");
            setDob("");
            setDobString("");
        }
    }, [isLoading]);

    // Fetch Members
    useEffect(() => {
        const getMembers = async () => {
            try {
                const response = await axios.get(API_URL + "api/users/allmembers");
                const recentMembers = await response.data.slice(0, 5);
                setRecentAddedMembers(recentMembers);
            }
            catch (err) {
                console.log(err);
            }
        };
        getMembers();
    }, [API_URL]);

    return (
        <div>
            <div className="signup-container">
                <div className="signup-card">
                    <form onSubmit={addMember}>
                        <h2 className="signup-title"> Sign Up</h2>
                        <p className="line"></p>
                        <input type="hidden" name="userType" value={userType} />

                        <label htmlFor="userFullName"><b>Full Name</b><span className="required-field">*</span></label>
                        <input className="signup-textbox" placeholder="Enter Full Name" type="text" name="userFullName" 
                        value={userFullName} required onChange={(e) => setUserFullName(e.target.value)}></input>
                        <br />

                        <label htmlFor={userType === "Student" ? "admissionId" : "employeeId"}> <b>{userType === "Student" ? "Admission Id " : "Employee Id "}</b><span className="required-field">*</span></label>
                        <input className="signup-textbox" type="text" value={userType === "Student" ? admissionId : employeeId} required onChange={(e) => { userType === "Student" ? setAdmissionId(e.target.value) : setEmployeeId(e.target.value) }}></input><br />

                        <label htmlFor="mobileNumber"><b>Mobile Number</b> <span className="required-field">*</span></label>
                        <input className="signup-textbox" placeholder="Enter Mobile Number" type="text" name="mobileNumber"
                        value={mobileNumber} maxLength={10} pattern="[0-9]*" required onChange={(e) => setMobileNumber(e.target.value)}></input>
                        <br />

                        <label htmlFor="gender"><b>Gender</b> <span className="required-field">*</span></label>
                                <Dropdown className='semanticdropdown-signup'
                                    placeholder='Choose Gender'
                                    fluid
                                    selection
                                    value={gender}
                                    options={genderTypes}
                                    onChange={(event, data) => setGender(data.value)}
                                />
                        <br />

                        <label htmlFor="dob"> <b>DOB</b> <span className="required-field">*</span></label>
                            <DatePicker
                                className="date-picker-signup"
                                placeholderText="MM/DD/YYYY"
                                selected={dob}
                                onChange={(date) => { setDob(date); setDobString(moment(date).format("MM/DD/YYYY")) }}
                                dateFormat="MM/dd/yyyy"
                            />    
                        <br />

                        <label htmlFor="address"><b>Address</b><span className="required-field">*</span></label>
                        <input className="signup-textbox" value={address} type="text" name="address" 
                         required onChange={(e) => setAddress(e.target.value)}></input><br />

                        <label htmlFor="email"><b>Email</b><span className="required-field">*</span></label>
                        <input className="signup-textbox" type="email" value={email} name="email"
                        required onChange={(e) => setEmail(e.target.value)}></input><br />

                        <label htmlFor="password"><b>Password</b><span className="required-field">*</span></label>
                        <input className="signup-textbox" type="password" value={password} name="password"
                        onChange={(e) => setPassword(e.target.value)}></input><br />

                        <input className="signup-button" type="submit" value="SUBMIT" disabled={isLoading} ></input>            
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
