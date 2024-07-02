import React from "react";
import styles from "../UpdatePas/update.module.scss";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
const UptadePas = () => {
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { id, token } = useParams();
  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5174/update-pass/${id}/${token}`, { password })
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/profile");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <section>
      <div className="container">
        <div className={styles.update}>
          <h1>Update Password</h1>
          <form className={styles.all} onSubmit={handleSubmit}>
            <div className={styles.inp}>
              <p>Current Password</p>
              <input type="text" className={styles.text} />
            </div>
            <div className={styles.inp}>
              <p>New Password</p>
              <input type="text" className={styles.text} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className={styles.inp}>
              <p>Confirm New Password</p>
              <input type="text" className={styles.text} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </form>
          <Button className={styles.btn} type="submit">
            Save Changes
          </Button>
        </div>
      </div>
    </section>
  );
};
export default UptadePas;
