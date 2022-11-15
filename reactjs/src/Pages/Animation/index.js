/*
Author: Aritra banerjee
Use: To display the table dynamically with dynamic rowspan
*/
// ===================== Important react imports
import React from 'react';
import styles from "./Animation.module.css";
import Robot from "../../Images/Robot.svg"

// ===================== Main function =====================
function Animation() {

  

  // =================== Main return statement ===================
  return (
    <div id={`${styles.PageWrapper}`}>
      <div className={`${styles.robot}`}>
        <img
          src={Robot}
        />
      </div>
      <div className={`${styles.element}`}></div>
    </div>
  );
}

export default Animation;
