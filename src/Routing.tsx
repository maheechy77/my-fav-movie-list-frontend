import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteGuard from "./components/routeGaurd";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import MovieList from "./pages/MovieList";
import { store } from "./redux-store/store";

const Routing = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<RouteGuard />}>
            <Route path="/my_movie_list" element={<MovieList />} />
          </Route>
          <Route path="/forgot_password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default Routing;
