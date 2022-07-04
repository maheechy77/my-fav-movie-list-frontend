import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, setCredentials } from "../redux-store/authReducer";

import style from "../style/movieList.module.css";

const MovieList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  let username = localStorage.getItem("username");
  let welcomeUser = username ? `Welcome ${username}` : "";
  let [movieData, setMovieData] = useState([]);

  console.log(token);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ access_token: token, username }));
      const getMovieData = async (token: string) => {
        const response = await axios.get(
          "http://localhost:3001/auth/movie_list",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        console.log("res", response.data.data);

        await setMovieData(response.data.data);
      };
      getMovieData(token);
    }
  }, []);

  useEffect(() => {
    console.log("movieData", movieData);
  }, [movieData]);

  const signOut = (): void => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className={style.movieList}>
      <h2>My Favourite Movie List</h2>
      <div className={style.movieListHeader}>
        <h4>{welcomeUser}</h4>
        <button onClick={signOut}>LogOut</button>
      </div>
      {movieData.map((data: any, index) => (
        <div key={index} className={style.movie}>
          <img src={data.imageUrl} alt="movie_img" />
          <div className={style.movieDetails}>
            <h3>{data.title}</h3>
            <h4>Release Date: {data.releaseDate}</h4>
            <p>Movie Description: {data.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
