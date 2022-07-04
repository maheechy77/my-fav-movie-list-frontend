import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../redux-store/authReducer";

import style from "../style/login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [message, setMessage] = useState("Field is empty");

  useEffect(() => {}, []);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "") {
      setUsernameError(true);
    } else if (password === "") {
      setPasswordError(true);
    }

    try {
      let response: any = await axios.post("http://localhost:3001/auth/login", {
        username: username,
        password: password,
      });
      const { access_token, user } = response.data;
      dispatch(setCredentials({ access_token, username: user.name }));
      navigate("/my_movie_list");
    } catch (err: any) {
      // Handle Error Here

      setAuthError(true);
      setMessage(err.response.data.message);
      const timer = setTimeout(() => {
        setAuthError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  };

  const setInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (usernameError) {
      setUsernameError(false);
    }
    if (passwordError) {
      setPasswordError(false);
    }

    if (e.target.name === "username") {
      setUsername(e.target.value);
    }

    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <div className={style.loginContainer}>
      <h2>My Movie List</h2>
      {authError ? <span className={style.error}>{message}</span> : ""}
      <div className={style.loginForm}>
        <form onSubmit={(e) => login(e)}>
          <div>
            <label>UserName/Email</label>
            <input
              name="username"
              id="username"
              value={username}
              onChange={(e) => setInputValue(e)}
              type="text"
              autoComplete="off"
            />
            {usernameError ? (
              <span className={style.error}>{message}</span>
            ) : (
              ""
            )}
          </div>
          <div>
            <label>Password</label>
            <input
              name="password"
              value={password}
              onChange={(e) => setInputValue(e)}
              type="password"
            />
            {passwordError ? (
              <span className={style.error}>{message}</span>
            ) : (
              ""
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className={style.forgotPassword}>
        <Link to={"/forgot_password"}>Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;
