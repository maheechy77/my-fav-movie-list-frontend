import React from "react";
import { Link } from "react-router-dom";

import style from "../style/forgotPassword.module.css";

const ForgotPassword = () => {
  return (
    <div className={style.forgotPassword}>
      <h2>Check Readme File</h2>
      <Link to={"/"}> Go to Log-In Page</Link>
    </div>
  );
};

export default ForgotPassword;
