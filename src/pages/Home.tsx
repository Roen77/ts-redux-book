import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ListContainer from "../containers/ListContainer";
import useToken from "../hooks/useToken";
import { logout } from "../redux/modules/auth";

const Home = () => {
  const token = useToken();

  if (token === null) {
    return <Redirect to="/signin" />;
  }
  return <ListContainer />;
};

export default Home;
