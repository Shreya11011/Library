import React, { useEffect, useState } from 'react';
import "../AdminDashboard.css";
import axios from "axios";
import { Dropdown } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

function AddMember() {

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
    const [userType, setUserType] = useState("Staff"); // Default to "Staff"
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
                    
            let isAdmin = userType === "Staff";

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
                alert("Member Added");
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
            <p className="dashboard-option-title">ADD NEW MEMBER</p>
            <div className="dashboard-title-line"></div>
            <form className="addmember-form" onSubmit={addMember}>
                <input type="hidden" name="userType" value={userType} />

                <div style={{ marginTop: '20px' }}>
                    <label className="addmember-form-label" htmlFor="userFullName">Full Name <span className="required-field">*</span></label>
                    <input className="addmember-form-input" type="text" name="userFullName" value={userFullName} required onChange={(e) => setUserFullName(e.target.value)}></input>

                    <label className="addmember-form-label" htmlFor={userType === "Student" ? "admissionId" : "employeeId"}>{userType === "Student" ? "Admission Id " : "Employee Id "}<span className="required-field">*</span></label>
                    <input className="addmember-form-input" name="employeeIdInput" type="text" value={userType === "Student" ? admissionId : employeeId} required onChange={(e) => { userType === "Student" ? setAdmissionId(e.target.value) : setEmployeeId(e.target.value) }}></input><br />
                </div>
                <div className="form-row">
                    <label className="addmember-form-label" htmlFor="mobileNumber">Mobile Number <span className="required-field">*</span></label>
                    <input className="addmember-form-input" name="mobileNumber" type="text" value={mobileNumber} maxLength={10} pattern="[0-9]*" required onChange={(e) => setMobileNumber(e.target.value)}></input>

                    <label className="addmember-form-label" htmlFor="address">Address <span className="required-field">*</span></label>
                    <input className="addmember-form-input address-field" name="address" value={address} type="text" required onChange={(e) => setAddress(e.target.value)}></input>

                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
                        <label className="addmember-form-label" htmlFor="dob">Date of Birth <span className="required-field">*</span></label>
                        <DatePicker
                            className="date-picker-addmember"
                            placeholderText="MM/DD/YYYY"
                            selected={dob}
                            onChange={(date) => { setDob(date); setDobString(moment(date).format("MM/DD/YYYY")) }}
                            dateFormat="MM/dd/yyyy"
                            style={{ width: '70%' }}
                        />
                    </div><br />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label className="addmember-form-label" htmlFor="gender">Gender <span className="required-field">*</span></label>
                    <div className='semanticdropdown-addmember'>
                        <Dropdown
                            placeholder='Gender'
                            fluid
                            selection
                            value={gender}
                            options={genderTypes}
                            onChange={(event, data) => setGender(data.value)}
                            
                        />
                    </div>
                    </div>
                <div style={{ marginTop: '20px' }}>
                    <label className="addmember-form-label" htmlFor="email">Email <span className="required-field">*</span></label>
                    <input className="addmember-form-input" name="email" type="email" value={email} required onChange={(e) => setEmail(e.target.value)}></input>

                    <label className="addmember-form-label" htmlFor="password">Password <span className="required-field">*</span></label>
                    <input className="addmember-form-input" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input><br />
                </div>
                <input className="addmember-submit" type="submit" value="SUBMIT" disabled={isLoading}></input>

            </form>
            <p className="dashboard-option-title">Recently Added Member</p>
            <div className="dashboard-title-line"></div>
            <table className='admindashboard-table'>
                <tbody>
                    <tr>
                        <th>S.No</th>
                        <th>Member Type</th>
                        <th>Member ID</th>
                        <th>Member Name</th>
                        <th>Member Email</th>
                    </tr>
                    {
                        recentAddedMembers.map((member, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{member.userType}</td>
                                    <td>{member.userType === "Student" ? member.admissionId : member.employeeId}</td>
                                    <td>{member.userFullName}</td>
                                    <td>{member.email}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AddMember;
