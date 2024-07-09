import React, { useState, useEffect } from "react";
import styles from "../Profile/profile.module.scss";
import {
  FormControl,
  Grid,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  MenuItem,
  Select,
  InputLabel,
  Button,
} from "@mui/material";
import { MdOutlineLogout } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

import { useDeleteUserMutation, useGetOneUserQuery, useUpdateUserMutation } from "../../services/redux/userApi";
import Swal from "sweetalert2";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [gender, setGender] = useState("male");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const { id } = useParams();
  const userId = id;
  const { data: userData, refetch } = useGetOneUserQuery(userId); 
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    if (localStorageData) {
      setEmail(localStorageData.email || "");
      setFirstName(localStorageData.firstName || "");
      setLastName(localStorageData.lastName || "");
      setPhoneNumber(localStorageData.mobile || "");
      setBirthday(localStorageData.birthday || "");
      setGender(localStorageData.gender || "male");
      setCountry(localStorageData.country || ""); 
    } else if (userData) { 
      setEmail(userData.email);
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setPhoneNumber(userData.mobile);
      setBirthday(userData.birthday);
      setGender(userData.gender);
      setCountry(userData.country);
    }
  }, [userData, userId]);

  const handleGenderChange = (event, newGender) => {
    setGender(newGender);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSaveChanges = async () => {
    const updatedUser = {
      email,
      firstName,
      lastName,
      phoneNumber,
      birthday,
      gender,
      country
    };
    await updateUser({id : userId, payload : updatedUser}); 
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success"
    });
    localStorage.setItem("user", JSON.stringify(updatedUser));
    refetch();
  };

  const handleDeleteAccount = async () => {
    await deleteUser(userId);
    localStorage.removeItem("user");
    localStorage.removeItem("_id");
  };
  
  return (
    <div className={styles.personArea}>
      <div className="container">
        <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
            <div className={styles.personalContent}>
              <h1>Personal Data</h1>
              <TextField
                id="outlined-email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="outlined-first-name"
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                id="outlined-last-name"
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                id="outlined-phone-number"
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <TextField
                id="outlined-birthday"
                label="Birthday"
                variant="outlined"
                fullWidth
                margin="normal"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                  labelId="country-label"
                  id="country-select"
                  value={country}
                  onChange={handleCountryChange}
                  label="Country"
                >
                  <MenuItem value="Azerbaijan">Azerbaijan</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                  <MenuItem value="UK">UK</MenuItem>
                  <MenuItem value="Australia">Australia</MenuItem>
                  <MenuItem value="India">India</MenuItem>
                </Select>
              </FormControl>
              <ToggleButtonGroup
                value={gender}
                exclusive
                onChange={handleGenderChange}
                aria-label="gender"
                style={{ marginTop: "16px" }}
              >
                <ToggleButton
                  value="male"
                  aria-label="male"
                  style={{
                    backgroundColor: gender === "male" ? "#fd0" : "inherit",
                    borderColor: gender === "male" ? "black" : "inherit",
                    width: "150px",
                    border: "1px solid #fafafa",
                  }}
                >
                  Male
                </ToggleButton>
                <ToggleButton
                  value="female"
                  aria-label="female"
                  style={{
                    backgroundColor: gender === "female" ? "#fd0" : "inherit",
                    borderColor: gender === "female" ? "black" : "inherit",
                    width: "150px",
                    border: "1px solid #fafafa",
                  }}
                >
                  Female
                </ToggleButton>
              </ToggleButtonGroup>
              <div>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <Button className={styles.btn} onClick={handleSaveChanges}>
                    Save Changes
                  </Button>
                  <Button className={styles.btn1} onClick={handleDeleteAccount}>
                    Delete my account
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div
              className={styles.tab}
              onClick={() => handleTabChange("profile")}
              style={{
                backgroundColor: activeTab === "profile" ? "#fd0" : "white",
                cursor: "pointer",
                padding: "16px",
                border: "1px solid #d9d9d9",
                marginBottom: "8px"
              }}
            >
              Profile
            </div>
            <div
              className={styles.tab}
              onClick={() => handleTabChange("wallet")}
              style={{
                backgroundColor: activeTab === "wallet" ? "#fd0" : "white",
                cursor: "pointer",
                padding: "16px",
                border: "1px solid #d9d9d9",
                marginBottom: "8px"
              }}
            >
              Wallet
            </div>
            <div
              className={styles.tab}
              onClick={() => handleTabChange("gift")}
              style={{
                backgroundColor: activeTab === "gift" ? "#fd0" : "white",
                cursor: "pointer",
                padding: "16px",
                border: "1px solid #d9d9d9",
                marginBottom: "8px"
              }}
            >
              "iGift" Gift Card
            </div>
            <div
              className={styles.tab}
              onClick={() => handleTabChange("cards")}
              style={{
                backgroundColor: activeTab === "cards" ? "#fd0" : "white",
                cursor: "pointer",
                padding: "16px",
                border: "1px solid #d9d9d9",
                marginBottom: "8px"
              }}
            >
              My Cards
            </div>
            <Link to={`/update-pass/${userId}`} style={{textDecoration:'none'}}>
            <div
              className={styles.tab}
              onClick={() => handleTabChange("update")}

              style={{
                backgroundColor: activeTab === "update" ? "#fd0" : "white",
                cursor: "pointer",
                padding: "16px",
                border: "1px solid #d9d9d9",
                marginBottom: "8px"
              }}
            >
              Update Password
              
            </div>

            </Link>
            <div
              className={styles.tab}
              onClick={handleDeleteAccount}
              style={{
                backgroundColor: activeTab === "logout" ? "#fd0" : "white",
                cursor: "pointer",
                padding: "16px",
                border: "1px solid #d9d9d9",
                marginBottom: "8px"
              }}
            >
              Logout
              <MdOutlineLogout size={22} style={{marginLeft:"auto"}} />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Profile;
