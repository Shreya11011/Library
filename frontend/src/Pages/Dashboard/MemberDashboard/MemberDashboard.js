import React, { useContext, useEffect, useState } from "react";
import "../AdminDashboard/AdminDashboard.css";
import "./MemberDashboard.css";
import Searchbooks from "./Searchbooks";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from '@material-ui/icons/Search';
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import CloseIcon from "@material-ui/icons/Close";
import Fetchbooks from "./Fetchbooks";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { IconButton } from "@material-ui/core";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import moment from "moment";

function MemberDashboard() {
  const [active, setActive] = useState("profile");
  const [sidebar, setSidebar] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;
  const { user } = useContext(AuthContext);
  const [memberDetails, setMemberDetails] = useState(null);

  useEffect(() => {
    const getMemberDetails = async () => {
      try {
        const response = await axios.get(
          API_URL + "api/users/getuser/" + user._id
        );
        setMemberDetails(response.data);
      } catch (err) {
        console.log("Error in fetching the member details");
      }
    };
    getMemberDetails();
  }, [API_URL, user]);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <div className="sidebar-toggler" onClick={() => setSidebar(!sidebar)}>
          <IconButton>
            {sidebar ? (
              <CloseIcon style={{ fontSize: 25, color: "rgb(234, 68, 74)" }} />
            ) : (
              <DoubleArrowIcon
                style={{ fontSize: 25, color: "rgb(234, 68, 74)" }}
              />
            )}
          </IconButton>
        </div>
        <div
          className={sidebar ? "dashboard-options active" : "dashboard-options"}
        >
          <div className="dashboard-logo">
          <img src="https://www.pfw.edu/sites/default/files/styles/50_50_landscape/public/50-50/AlumniLogoCropped.jpg?h=fb985e55&itok=uzzv1SND" alt="Logo" style={{ width: 90, height: 90 , borderRadius: '50%'}} />
            <p className="logo-name">CRL</p>
          </div>
          <a
            href="#profile@member"
            className={`dashboard-option ${
              active === "profile" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("profile");
              setSidebar(false);
            }}
          >
            <AccountCircleIcon className="dashboard-option-icon" /> Profile
          </a>
          <a
            href="#activebooks@member"
            className={`dashboard-option ${
              active === "browsebook" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("browsebook");
              setSidebar(false);
            }}
          >
          <LocalLibraryIcon className="dashboard-option-icon" /> All Books
          </a>
          <a
            href="#browsebook"
            className={`dashboard-option ${
              active === "searchbook" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("searchbook");
              setSidebar(false);
            }}
          >
          <SearchIcon className="dashboard-option-icon" /> Search Books
          </a>
          
          
          <a
            href="#profile@member"
            className={`dashboard-option ${
              active === "logout" ? "clicked" : ""
            }`}
            onClick={() => {
              logout();
              setActive("reserved")
              setSidebar(false);
            }}
          >
            <PowerSettingsNewIcon className="dashboard-option-icon" /> Log out{" "}
          </a>
        </div>

        {/* Profile */}
        <div className="dashboard-option-content">
          {active === "profile" && (
            <div className="member-profile-content" id="profile@member">
              <div className="user-details-topbar">
                <img
                  className="user-profileimage"
                  src="./assets/images/Profile.png"
                  alt=""
                ></img>
                <div className="user-info">
                  <p className="user-name">{memberDetails?.userFullName}</p>
                  <p className="user-id">
                    {memberDetails?.userType === "Student"
                      ? memberDetails?.admissionId
                      : memberDetails?.employeeId}
                  </p>
                  <p className="user-email">{memberDetails?.email}</p>
                  <p className="user-phone">{memberDetails?.mobileNumber}</p>
                </div>
              </div>
              <div className="user-details-specific">
                <div className="specific-left">
                  <div className="specific-left-top">
                    <p className="specific-left-topic">
                      <span style={{ fontSize: "18px" }}>
                        <b>Age</b>
                      </span>
                      <span style={{ fontSize: "16px" }}>
                        {memberDetails?.age}
                      </span>
                    </p>
                    <p className="specific-left-topic">
                      <span style={{ fontSize: "18px" }}>
                        <b>Gender</b>
                      </span>
                      <span style={{ fontSize: "16px" }}>
                        {memberDetails?.gender}
                      </span>
                    </p>
                  </div>
                  <div className="specific-left-bottom">
                    <p className="specific-left-topic">
                      <span style={{ fontSize: "18px" }}>
                        <b>DOB</b>
                      </span>
                      <span style={{ fontSize: "16px" }}>
                        {memberDetails?.dob}
                      </span>
                    </p>
                    <p className="specific-left-topic">
                      <span style={{ fontSize: "18px" }}>
                        <b>Address</b>
                      </span>
                      <span style={{ fontSize: "16px" }}>
                        {memberDetails?.address}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="specific-right">
                  <div className="specific-right-top">
                    <p className="specific-right-topic">
                      <b>Points</b>
                    </p>
                    <p
                      style={{
                        fontSize: "25px",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "15px",
                      }}
                    >
                      540
                    </p>
                  </div>
                  <div className="dashboard-title-line"></div>
                  <div className="specific-right-bottom">
                    <p className="specific-right-topic">
                      <b>Rank</b>
                    </p>
                    <p
                      style={{
                        fontSize: "25px",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "15px",
                      }}
                    >
                      {memberDetails?.points}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {active === "profile" && (
            <div className="member-activebooks-content" id="activebooks@member">
              <p className="member-dashboard-heading">Issued</p>
              <table className="activebooks-table">
                <tr>
                  <th>S.No</th>
                  <th>Book-Name</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Fine</th>
                </tr>
                {memberDetails?.activeTransactions
                  ?.filter((data) => {
                    return data.transactionType === "Issued";
                  })
                  .map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.bookName}</td>
                        <td>{data.fromDate}</td>
                        <td>{data.toDate}</td>
                        <td>
                          {Math.floor(
                            (Date.parse(moment(new Date()).format("MM/DD/YYYY")) -
                              Date.parse(data.toDate)) /
                              86400000
                          ) <= 0
                            ? 0
                            : Math.floor(
                                (Date.parse(
                                  moment(new Date()).format("MM/DD/YYYY")
                                ) -
                                  Date.parse(data.toDate)) /
                                  86400000
                              ) * 10}
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </div>
          )}

          {active === "browsebook" && (
            <div className="member-profile-content" id="browsebook">
              <Fetchbooks />
            </div>
          )}

          {active === "searchbook" && (
            <div className="member-profile-content" id="searchbook">
              <Searchbooks />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;
