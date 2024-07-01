import React from "react";
import styles from "../UpdatePas/update.module.scss";
import { Button } from "@mui/material";
const UptadePas = () => {
  return (
    <section>
      <div className="container">
        <div className={styles.update}>
          <h1>Update Password</h1>
          <div className={styles.all}>
            <div className={styles.inp}>
              <p>Current Password</p>
              <input type="text" className={styles.text} />
            </div>
            <div className={styles.inp}>
              <p>New Password</p>
              <input type="text" className={styles.text} />
            </div>
            <div className={styles.inp}>
              <p>Confirm New Password</p>
              <input type="text" className={styles.text} />
            </div>
          </div>
          <Button className={styles.btn} type="submit">Save Changes</Button>
        </div>
      </div>
    </section>
  );
};
export default UptadePas;
